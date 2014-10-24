/* global angular,_ */
'use strict';

angular.module('core').controller('InviteController', ['$scope', '$cordovaContacts', '$state', '$ionicPlatform', 'cacheContacts',
  function ($scope, $cordovaContacts, $state, $ionicPlatform, cacheContacts) {
    $scope.status_contacts = 'Loading Contacts...';

    cacheContacts.getContacts().then(function (contacts) {
      $scope.contacts = contacts;
      // mark contacts already added.
      if ($scope.$parent.event) {
        _.each(contacts, function (contact) {
          contact.alreadyAdded = -1 !== _.findIndex($scope.$parent.event.invited, function (invite) {
            return invite.phoneNumber === contact.phoneNumber.cleanedValue;
          });
        });
      }
      $scope.status_contacts = '';
    }, function (err) {
      $scope.status_contacts = ('Error: ' + JSON.stringify(err));
    });

    $scope.data = {};

    $scope.addInvite = function (contact) {
      $scope.$parent.newInvites.push(contact);
      $scope.data.searchString = '';
      if ($scope.$parent.newInvites.length === 2) {
        $state.go('^.compose');
      }
    };

    $scope.removeInvite = function (contact) {
      $scope.data.searchString = '';
      $scope.$parent.newInvites = _.without($scope.$parent.newInvites, contact);
    };
  }]);
