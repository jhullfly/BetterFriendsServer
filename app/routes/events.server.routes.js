'use strict';
(function () {

  module.exports = function (app) {
    var events = require('../../app/controllers/events');
    var promiseHandler = require('./promiseHandler');
    app.route('/event/createAndInvite').post(promiseHandler.handle(events.createAndInvite));
    app.route('/event/get/:eid/:inviteCode').get(promiseHandler.handle(events.get));
    app.route('/event/updateStatus/:eid/:inviteCode').post(promiseHandler.handle(events.updateStatus));
  };

})();

