'use strict';
(function () {

  var Q = require('q');
  var mongoose = require('mongoose');
  var sms = require('./sms');
  var RandomString = require('./randomString');
  var User = mongoose.model('User');
  var UnconfirmedUser = mongoose.model('UnconfirmedUser');

  function cleanPhone(phone) {
    return phone.replace(/ /g, '').replace(/\-/, '');
  }

  function sendVerificationCode(phoneNumber, code) {
    var message = 'To verify phone number click --> betterfriends://verify?code='+code;
    return sms.send(phoneNumber, message);
  }

  exports.authMiddleware = function(req, res, next) {
    var uuid = req.get('X-Device-UUID');
    if (uuid) {
      User.findOne({uuid:uuid}).exec().then(function (user) {
        if (!user) {
          next('no user for uuid = "'+uuid+'"');
        }
        res.locals.user = user;
        next();
      }, function (err) {
        next(err);
      });
    } else {
      next('missing "device-uuid" header');
    }
  };

  exports.sendConfirmCode = function (req) {
    var skipSend = req.param('skipSend', false);
    var data = {
      uuid : req.param('uuid'),
      name : req.param('name'),
      phoneNumber : cleanPhone(req.param('phoneNumber')),
      confirmCode : RandomString.generate(6)
    };
    var p = UnconfirmedUser.findOneAndUpdate({uuid:data.uuid}, data, {upsert:true}).exec();
    return p.then(function (unuser) {
      return sendVerificationCode(data.phoneNumber, data.confirmCode).then(function (returnData) {
        if (data.uuid.indexOf('fake-') === 0) {
          // if we are on a test device return the confirm code.
          return {success:true, testConfirmCode : data.confirmCode};
        } else {
          return {success:true};
        }
      });
    });
  };

  function confirmUser(unuser) {
    //case 1: user with uuid and phone exists. Just update name. done.
    return User.findOneAndUpdate({uuid:unuser.uuid, phoneNumber:unuser.phoneNumber}, {name:unuser.name}).exec().then(
      function (user) {
        if (user) {
          return user;
        } else {
          // case 2: user exists with same uuid different phone. change uuid to fake uuid. continue.
          return User.findOneAndUpdate({uuid:unuser.uuid}, {uuid:'old'+RandomString.generate(6)+'-'+unuser.uuid}).exec().then(
            function () {
              //case 3: user exists with same phonenumber different uuid. update uuid and name. done.
              return User.findOneAndUpdate({phoneNumber:unuser.phoneNumber}, {uuid:unuser.uuid, name:unuser.name}).exec().then(
                function(user2) {
                  if (user2) {
                    return user2;
                  } else {
                    //case 4: no user exists. create one.
                    return User.create({
                      uuid: unuser.uuid,
                      phoneNumber:unuser.phoneNumber,
                      name:unuser.name}).then(
                      function(user3) {
                        return user3;
                      });
                  }
                });
            });
        }
      }
    );
  }

  exports.register = function (req) {
    var uuid = req.param('uuid');
    var confirmCode = req.param('confirmCode');
    return UnconfirmedUser.findOne({uuid:uuid}, '+confirmCode').exec().then(
      function (unuser) {
        if (unuser && unuser.confirmCode === confirmCode) {
          //valid code. remove unconfirmed user and create confirmed user.
          return UnconfirmedUser.findOneAndRemove({uuid:uuid}).exec().then(
            function() {
              return confirmUser(unuser).then(function (user) {
                return {success:true, user:user};
              });
            });
        } else if (!unuser) {
          return {success:false, message:'no record of confirmation code'};
        } else {
          return {success:false, message:'invalid confirmation code: \''+confirmCode+'\''};
        }
      }
    );
  };

  exports.getUser = function(req) {
    return User.findOne({uuid:req.param('uuid')}).exec().then(function(user) {
      if (user) {
        return {success:true, user:user};
      } else {
        return {success:false, message:'no such user'};
      }
    });
  };

})();