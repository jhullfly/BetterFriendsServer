/* global angular,_ */
'use strict';

angular.module('core').controller('ComposeController', ['$scope', '$state', '$stateParams', 'Events',
  function ($scope, $state, $stateParams, Events) {
    $scope.addInvites = function () {
      $scope.processing = true;
      var messages = [{
        name: $scope.$parent.newInvites[0].name.formatted,
        phoneNumber: $scope.$parent.newInvites[0].phoneNumber.cleanedValue,
        message: $scope.message1
      }, {
        name: $scope.$parent.newInvites[1].name.formatted,
        phoneNumber: $scope.$parent.newInvites[1].phoneNumber.cleanedValue,
        message: $scope.message2
      }];
      Events.createOrUpdateAndInvite($stateParams.eid, messages).then(function(data) {
        $scope.$parent.newInvites = [];
        if ($stateParams.eid !== 'new') {
          $scope.$parent.event = data;
          $state.go('^.detail');
        } else {
          $state.go('event.detail', {eid: data.id});
        }
      }, function (err) {
        console.log(err);
        $scope.processing = false;
        $scope.errorMessage = JSON.stringify(err);
      });
    };
    if (!$scope.$parent.newInvites || $scope.$parent.newInvites.length < 2) {
      $state.go('^.invite');
    }

    $scope.message1 = 'Hey. Drinks?';
    $scope.message2 = $scope.message1;
    $scope.sending_status = null;
  }]);
