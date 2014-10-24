/* globals angular */
'use strict';

angular.module('core').controller('HomeController', ['$scope', '$state', 'Events',
	function($scope, $state, Events) {
    Events.all().then(function (events) {
      if (events.length >= 1) {
        $state.go('event.detail', {eid:events[0]._id});
      } else {
        $state.go('event.invite', {eid:'new'});
      }
    });
	}
]);