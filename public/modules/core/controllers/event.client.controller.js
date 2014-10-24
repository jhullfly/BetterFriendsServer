/* global angular,_ */
'use strict';

angular.module('core').controller('EventController', ['$scope', '$state', '$stateParams', 'Events',
  function ($scope, $state, $stateParams, Events) {
    $scope.newInvites = [];
    if ($stateParams.eid !== 'new') {
      Events.get($stateParams.eid).then(function (event) {
        $scope.event = event;
      });
    }
  }]);
