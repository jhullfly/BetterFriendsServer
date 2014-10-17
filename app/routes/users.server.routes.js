'use strict';
(function () {

  function promiseHandler(fn) {
    return function(req, res, next) {
      var promise = fn(req);
      promise.then(function (data) {
        res.jsonp(data);
      }, function (err) {
        next(err);
      });
    };
  }

  module.exports = function (app) {
    var users = require('../../app/controllers/users');
    app.route('/user/get/:uuid').get(promiseHandler(users.getUser));
    app.route('/user/sendConfirmCode').post(promiseHandler(users.sendConfirmCode));
    app.route('/user/register').post(promiseHandler(users.register));
  };

})();

