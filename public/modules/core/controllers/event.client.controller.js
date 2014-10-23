/* global angular,_ */
'use strict';

angular.module('core').controller('EventController', ['$scope', '$state', '$stateParams', 'Events',
  function ($scope, $state, $stateParams, Events) {
    Events.get($stateParams.eid).then(function (event) {
       $scope.event = event;
    });
  }]);
