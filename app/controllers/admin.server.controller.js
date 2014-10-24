'use strict';
(function () {

  var mongoose = require('mongoose');
  var SmsMessage = mongoose.model('SmsMessage');

  exports.index = function (req, res) {
    res.render('admin');
  };

  exports.smsMessages = function() {
    return SmsMessage.find({}, null, {limit:20, sort:{created:-1}}).exec();
  };

})();