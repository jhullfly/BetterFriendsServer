'use strict';
(function () {

  var Q = require('q');
  var _ = require('lodash');
  var mongoose = require('mongoose');
  var sms = require('./sms');
  var RandomString = require('./randomString');
  var User = mongoose.model('User');
  var Event = mongoose.model('Event');

  function sendSmsInvite(user, event, invite, baseUrl) {
    var message = user.name + ': ' + invite.message + ' click to respond: '+baseUrl+'/landing/#/r/' + event.id + '/' + invite.inviteCode;
    return sms.send(invite.phoneNumber, message);
  }

  function sendSmsInvites(user, event, invited, baseUrl) {
    var promises = [];
    _.each(invited, function (invite) { promises.push(sendSmsInvite(user, event, invite, baseUrl)); });
    return Q.all(promises);
  }

  exports.createAndInvite = function (req, locals) {
    var event = req.body;
    var baseUrl = locals.baseUrl;
    var user = locals.user;
    _.each(event.invited, function (invite) { invite.inviteCode = RandomString.generate(6);});
    return Event.create(event).then(
      function (dbevent) {
        return sendSmsInvites(user, dbevent, dbevent.invited, baseUrl).then(function (smsReturn) {
          return {success:true, id: dbevent._id};
        });
      }
    );
  };

  exports.addInvited = function (req, locals) {
    var invited = req.body;
    var baseUrl = locals.baseUrl;
    var user = locals.user;
    var eid = req.param('eid');
    _.each(invited, function (invite) { invite.inviteCode = RandomString.generate(6);});
    return Event.findById(eid)
      .populate('creator', 'name phoneNumber')
      .populate('invited.invitedBy', 'name phoneNumber')
      .exec().then(function (event) {
        _.each(invited, function (invite) {
          event.invited.push(invite);
        });
        return save(event).then(function (event) {
          return sendSmsInvites(user, event, invited, baseUrl).then(function (smsReturn) {
            return {success:true, event: event};
          });
        });
    });
  };

  exports.get = function (req) {
    var eid = req.param('eid');
    return Event.findById(eid)
      .populate('creator', 'name phoneNumber')
      .populate('invited.invitedBy', 'name phoneNumber')
      .exec().then(function(event) {
        if (event) {
          return {success: true, event: event};
        } else {
          Q.reject('unknown event id "' + eid + '"');
        }
      });
  };

  exports.all = function (req, locals) {
    var allevents = [];
    var user = locals.user;
    return Event.find({creator:user._id})
      .populate('creator', 'name phoneNumber')
      .populate('invited.invitedBy', 'name phoneNumber')
      .exec().then(function(events) {
        allevents = allevents.concat(events);
        return allevents;
      }).then(function () {
        return Event.find({'invited.phoneNumber':user.phoneNumber})
          .populate('creator', 'name phoneNumber')
          .populate('invited.invitedBy', 'name phoneNumber')
          .exec().then(function (events) {
          allevents = allevents.concat(events);
          return allevents;
        });
      });
  };

  exports.setVerifiedCookie = function(req, res) {
    var eid = req.param('eid');
    var inviteCode = req.param('inviteCode');
    var data = {eid:eid, inviteCode:inviteCode};
    res.cookie('verify-info', data, {path : '/', maxAge:9000000000});
  };

  exports.getAnon = function (req) {
    var eid = req.param('eid');
    var inviteCode = req.param('inviteCode');
    return Event.findById(eid, '+invited.inviteCode').exec().then(function (event) {
      if (event) {
        var invitee = _.find(event.invited, function(invite) {
          return (invite.inviteCode === inviteCode);
        });
        if (invitee) {
          var inviteePhoneNumber = invitee.phoneNumber;
          // re-fetch without invite code and with creator, invitedBy
          return Event.findById(eid)
            .populate('creator', 'name phoneNumber')
            .populate('invited.invitedBy', 'name phoneNumber')
            .exec().then(function (event2) {
              var invitee2 = _.find(event2.invited, function(invite) {
                return (invite.phoneNumber === inviteePhoneNumber);
              });
              return {success: true, invitee: invitee2, event: event2};
            }
          );
        } else {
          return Q.reject('invalid inviteCode "'+inviteCode+'"');
        }
      } else {
        return Q.reject('unknown event id "'+eid+'"');
      }
    });
  };

  function save(event) {
    var defer = Q.defer();
    event.save(function (err, event) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(event);
      }
    });
    return defer.promise;
  }

  exports.updateStatusAnon = function (req) {
    var eid = req.param('eid');
    var inviteCode = req.param('inviteCode');
    var newStatus = req.param('newStatus');
    return Event.findById(eid, '+invited.inviteCode').exec().then(function (event) {
      if (event) {
        var invitee = _.find(event.invited, function(invite) {
          return (invite.inviteCode === inviteCode);
        });
        if (invitee) {
          invitee.status = newStatus;
          invitee.repliedOn = new Date();
          return save(event).then(function () {
            return {success:true};
          });
        } else {
          return Q.reject('invalid inviteCode "'+inviteCode+'"');
        }
      } else {
        return Q.reject('unknown event id "'+eid+'"');
      }
    });
  };


})();