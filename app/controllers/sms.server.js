'use strict';
(function () {

  var Q = require('q');
  var _ = require('lodash');
  var Nexmo = require('easynexmo');
  var mongoose = require('mongoose');
  var SmsMessage = mongoose.model('SmsMessage');

  var testNumbers = ['1111111111','2222222222','3333333333','4444444444','5555555555',
    '6666666666','7777777777','8888888888','9999999999'];

  /*
      Puts a standard promise wrapper around Nexmo and does a little error parsing.
   */
  exports.send = function(phoneNumber, message) {
    if (_.contains(testNumbers, phoneNumber)) {
      // if a test number just store in the database.
      return SmsMessage.create({phoneNumber:phoneNumber, message:message});
    }
    var defer = Q.defer();
    Nexmo.initialize('e9dc2606','15252205','https', true);
    Nexmo.sendTextMessage('12243109030', '+1'+phoneNumber, message, {}, function(err, data) {
      if (err) {
        defer.reject(err);
      } else if (!data.messages || data.messages.length < 1) {
        defer.reject('unable to find nexmo return status '+JSON.stringify(data));
      } else if (data.messages[0].status !== '0') {
        defer.reject('bad status code from nexmo '+JSON.stringify(data));
      } else {
        defer.resolve(data);
      }
    });
    return defer.promise;
  };


})();