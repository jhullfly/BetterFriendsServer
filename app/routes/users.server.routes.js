'use strict';
(function () {

  module.exports = function (app) {
    var users = require('../../app/controllers/users');
    var promiseHandler = require('./promiseHandler');
    app.route('/user/get/:uuid').get(promiseHandler.handle(users.getUser));
    app.route('/user/sendConfirmCode').post(promiseHandler.handle(users.sendConfirmCode));
    app.route('/user/register').post(promiseHandler.handle(users.register));
  };

})();

