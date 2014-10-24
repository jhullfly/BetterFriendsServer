'use strict';
(function () {

  module.exports = function (app) {
    var events = require('../../app/controllers/events');
    var promiseHandler = require('./promiseHandler');

    app.route('/auth/event/createAndInvite').post(promiseHandler.handle(events.createAndInvite));
    app.route('/auth/event/addInvited/:eid').post(promiseHandler.handle(events.addInvited));
    app.route('/auth/event/get/:eid').get(promiseHandler.handle(events.get));
    app.route('/auth/event/all').get(promiseHandler.handle(events.all));

    // anonymous routes to handle the safari landing page
    app.route('/event/get/:eid/:inviteCode').get(promiseHandler.handle(events.getAnon, events.setVerifiedCookie));
    app.route('/event/updateStatus/:eid/:inviteCode').post(promiseHandler.handle(events.updateStatusAnon));
  };

})();

