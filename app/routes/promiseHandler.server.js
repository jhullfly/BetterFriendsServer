'use strict';
(function () {

  /*
      fn: is a function that takes a request and returns a promise.
      Sends the resolution of the promise as a jsonp response and handles errors.
   */
  exports.handle = function (fn, afterSuccess) {
    return function(req, res, next) {
      var promise = fn(req, res.locals);
      promise.then(function (data) {
        if (afterSuccess) {
          afterSuccess(req, res, data);
        }
        res.jsonp(data);
      }, function (err) {
        next(err);
      });
    };
  };

})();

