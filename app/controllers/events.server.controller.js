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

  function sendSmsInvites(user, event, baseUrl) {
    var promises = [];
    console.log('event = ' +JSON.stringify(event));
    _.each(event.invited, function (invite) { promises.push(sendSmsInvite(user, event, invite, baseUrl)); });
    return Q.all(promises);
  }

  exports.createAndInvite = function (req, locals) {
    var event = req.body;
    var baseUrl = locals.baseUrl;
    _.each(event.invited, function (invite) { invite.inviteCode = RandomString.generate(6);});
    return User.findById(event.creator).exec().then(function(user) {
      return Event.create(event).then(
        function (dbevent) {
          return sendSmsInvites(user, dbevent, baseUrl);
        }
      );
    });
  };

  exports.get = function (req) {
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

  exports.updateStatus = function (req) {
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
          var defer = Q.defer();
          event.save(function (err) {
            if (err) {
              defer.reject(err);
            } else {
              defer.resolve({success:true});
            }
          });
          return defer.promise;
        } else {
          return Q.reject('invalid inviteCode "'+inviteCode+'"');
        }
      } else {
        return Q.reject('unknown event id "'+eid+'"');
      }
    });
  };


})();