'use strict';
(function () {

  var uaParser = require('ua-parser');

  function uaMiddleware(req, res, next) {
    res.locals.parsedUA = uaParser.parse(req.headers['user-agent']);
    next();
  }

  module.exports = function (app) {
    // Root routing
    var core = require('../../app/controllers/core');
    app.route('/').get(core.index);
    app.route('/landing').get(core.landing);
    // these files are different by platform so we generate them dynamically
    app.get('/platforms/*', uaMiddleware, core.platforms);

    app.get('/configuration', function (req, res) {
      res.jsonp({
        jsFiles: app.locals.jsFiles,
        cssFiles: app.locals.cssFiles
      });
    });
  };

})();