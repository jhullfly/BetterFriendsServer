/* global angular,_ */
'use strict';

angular.module('core').controller('InviteController', ['$scope', '$cordovaContacts', '$state', '$ionicPlatform', 'invited', 'cacheContacts',
  function ($scope, $cordovaContacts, $state, $ionicPlatform, invited, cacheContacts) {
    $scope.status_contacts = 'Loading Contacts...';

    cacheContacts.getContacts().then(function (contacts) {
      $scope.contacts = contacts;
      $scope.status_contacts = '';
    }, function (err) {
      $scope.status_contacts = ('Error: ' + JSON.stringify(err));
    });

    $scope.invitedContacts = [];
    $scope.data = {};

    $scope.addInvite = function (contact) {
      $scope.invitedContacts.push(contact);
      $scope.data.searchString = '';
      if ($scope.invitedContacts.length === 2) {
        invited.setContacts($scope.invitedContacts);
        $state.go('compose');
      }
    };

    $scope.removeInvite = function (contact) {
      $scope.data.searchString = '';
      $scope.invitedContacts = _.without($scope.invitedContacts, contact);
    };
  }]);
