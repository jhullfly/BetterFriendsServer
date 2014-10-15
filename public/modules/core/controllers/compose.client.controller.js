/* global angular,_ */
'use strict';

angular.module('core').controller('ComposeCtrl', ['$scope', '$state', '$cordovaSms', 'invited',
  function ($scope, $state, $cordovaSms, invited) {
    $scope.sendSms = function (index) {
      $scope.sending_status = 'Sending message to ' + $scope.invitedContacts[index].name.formatted;

      var messageInfo = {
        phoneNumber: $scope.invitedContacts[index].phoneNumber.value,
        textMessage: $scope.message1
      };

      $cordovaSms.send(messageInfo).then(function () {
        if (index === 0) {
          $scope.sendSms(index + 1);
        } else {
          $scope.sending_status = 'Sent messages to ' + $scope.invitedContacts[0].name.formatted +
            ' and ' + $scope.invitedContacts[1].name.formatted;
        }
      }, function (error) {
        $scope.sending_status = 'error: ' + JSON.stringify(error);
      });
    };

    if (!invited.getContacts() || invited.getContacts().length < 2) {
      $state.go('invite');
    }

    $scope.invitedContacts = invited.getContacts();
    $scope.message1 = 'Hey wanna grab drinks with me at the Lone Palm. Monday? 8pm? Reply here: http://blaa';
    $scope.message2 = $scope.message1;
    $scope.sending_status = null;
  }]);
