'use strict';
(function () {

  module.exports = function (app) {
    var events = require('../../app/controllers/events');
    var promiseHandler = require('./promiseHandler');

    app.route('/auth/event/createAndInvite').post(promiseHandler.handle(events.createAndInvite));
    app.route('/auth/event/get/:eid').get(promiseHandler.handle(events.get));

    // anonymous routes to handle the safari landing page
    app.route('/event/get/:eid/:inviteCode').get(promiseHandler.handle(events.getAnon));
    app.route('/event/updateStatus/:eid/:inviteCode').post(promiseHandler.handle(events.updateStatusAnon));
  };

})();

