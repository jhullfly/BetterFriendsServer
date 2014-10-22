'use strict';
(function () {

  var Q = require('q');
  var Nexmo = require('easynexmo');

  /*
      Puts a standard promise wrapper around Nexmo and does a little error parsing.
   */
  exports.send = function(phoneNumber, message) {
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