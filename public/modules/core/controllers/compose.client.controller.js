/* global angular,_ */
'use strict';

angular.module('core').controller('ComposeController', ['$scope', '$state', 'invited', 'Events',
  function ($scope, $state, invited, Events) {
    $scope.createEvent = function () {
      $scope.processing = true;
      var messages = [{
        name: $scope.invitedContacts[0].name.formatted,
        phoneNumber: $scope.invitedContacts[0].phoneNumber.cleanedValue,
        message: $scope.message1
      }, {
        name: $scope.invitedContacts[1].name.formatted,
        phoneNumber: $scope.invitedContacts[1].phoneNumber.cleanedValue,
        message: $scope.message2
      }];
      Events.createAndInvite(messages).then(function(data) {
        $state.go('event', {eid: data.id});
      }, function (err) {
        console.log(err);
        $scope.processing = false;
        $scope.errorMessage = JSON.stringify(err);
      });
    };

    if (!invited.getContacts() || invited.getContacts().length < 2) {
      $state.go('invite');
    }

    $scope.invitedContacts = invited.getContacts();
    $scope.message1 = 'Hey. Drinks?';
    $scope.message2 = $scope.message1;
    $scope.sending_status = null;
  }]);
