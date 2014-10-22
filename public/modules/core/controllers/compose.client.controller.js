/* global angular,_ */
'use strict';

angular.module('core').controller('ComposeController', ['$scope', '$state', 'invited', 'Events',
  function ($scope, $state, invited, Events) {
    $scope.createEvent = function () {
      var messages = [{
        phoneNumber: $scope.invitedContacts[0].phoneNumber.cleanedValue,
        message: $scope.message1
      }, {
        phoneNumber: $scope.invitedContacts[1].phoneNumber.cleanedValue,
        message: $scope.message2
      }];
      Events.createAndInvite(messages);
    };

    if (!invited.getContacts() || invited.getContacts().length < 2) {
      $state.go('invite');
    }

    $scope.invitedContacts = invited.getContacts();
    $scope.message1 = 'Hey. Drinks?';
    $scope.message2 = $scope.message1;
    $scope.sending_status = null;
  }]);
