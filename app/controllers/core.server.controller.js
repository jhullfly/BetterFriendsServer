'use strict';
(function () {

  function getOS(res) {
    if (res.locals.parsedUA.os.family === 'iOS') {
      return 'ios';
    } else if (res.locals.parsedUA.os.family === 'Android') {
      return 'android';
    } else {
      return 'default';
    }
  }

  /**
   * Module dependencies.
   */
  exports.index = function (req, res) {
    res.render('index');
  };

  exports.platforms = function (req, res) {
    var os = getOS(res);
    var filePath = req.path.replace('/platforms', '/platforms/' + os);
    res.sendFile(filePath, {root: __dirname + '/..'});
  };

})();