'use strict';
(function () {

  var mongoose = require('mongoose');
  var Promise = require('mongoose/node_modules/mpromise');
  var User = mongoose.model('User');
  var UnconfirmedUser = mongoose.model('UnconfirmedUser');
  var Nexmo = require('easynexmo');

  function cleanPhone(phone) {
    return phone.replace(/ /g, '').replace(/\-/, '');
  }

  function sendVerificationCode(phoneNumber, code) {
    var promise = new Promise();
    Nexmo.initialize('e9dc2606','15252205','https', true);
    var message = 'To verify phone number click --> betterfriends://verify?code='+code;
    Nexmo.sendTextMessage('12243109030', '+1'+phoneNumber, message, {}, function(err, data) {
      if (err) {
        promise.reject(err);
      } else if (!data.messages || data.messages.length < 1) {
        promise.reject('unable to find nexmo return status '+JSON.stringify(data));
      } else if (data.messages[0].status !== '0') {
        promise.reject('bad status code from nexmo '+JSON.stringify(data));
      } else {
        promise.fulfill(data);
      }
    });
    return promise;
  }

  // random character that is a digit, upper case letter, or lower case letter
  function randomCharacter() {
    var num = Math.floor((Math.random() * 62));
    if (num < 10) {
      //digits
      return String.fromCharCode(48+num);
    } else if (num < 36) {
      // upper case number
      return String.fromCharCode(65+(num-10));
    } else {
      // lower case number
      return String.fromCharCode(97+(num-36));
    }
  }

  function generateRandomString(length) {
    var code = '';
    for(var i = 0 ; i < length ; i++) {
      code = code + randomCharacter();
    }
    return code;
  }

  exports.sendConfirmCode = function (req) {
    var skipSend = req.param('skipSend', false);
    var data = {
      uuid : req.param('uuid'),
      name : req.param('name'),
      phoneNumber : cleanPhone(req.param('phoneNumber')),
      confirmCode : generateRandomString(6)
    };
    var p = UnconfirmedUser.findOneAndUpdate({uuid:data.uuid}, data, {upsert:true}).exec();
    return p.then(function (unuser) {
      if (skipSend) {
        console.log('confirmCode = ' + data.confirmCode);
        return {success:true};
      }
      return sendVerificationCode(data.phoneNumber, data.confirmCode).then(function (data) {
        return {success:true};
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
          return User.findOneAndUpdate({uuid:unuser.uuid}, {uuid:'old'+generateRandomString(6)+'-'+unuser.uuid}).exec().then(
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