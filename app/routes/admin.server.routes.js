'use strict';
(function () {

  module.exports = function (app) {
    // Root routing
    var admin = require('../../app/controllers/admin');
    var promiseHandler = require('./promiseHandler');

    app.route('/admin').get(admin.index);
    app.route('/smsMessages/all').get(promiseHandler.handle(admin.smsMessages));
  };
})();