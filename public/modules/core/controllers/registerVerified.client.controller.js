/* global angular,_ */
'use strict';

angular.module('core').controller('RegisterVerifiedController', ['$scope', '$state', '$ionicPopover', '$stateParams', 'Auth', 'Events',
  function ($scope, $state, $ionicPopover, $stateParams, Auth, Events) {
    $ionicPopover.fromTemplateUrl('name-info.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.namePopover = popover;
    });

    $scope.openNamePopover = function($event) {
      $scope.namePopover.show($event);
    };
    $scope.closeNamePopover = function() {
      $scope.namePopover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.namePopover.remove();
    });

    $scope.getNameAndPhone = function() {
      $scope.loading = true;
      Events.getAnon($stateParams.eid, $stateParams.inviteCode).then(function (data) {
        $scope.loading = false;
        $scope.data.name = data.invitee.name;
        $scope.data.phoneNumber = data.invitee.phoneNumber;
      }, function (err) {
        $scope.loading = false;
        console.log(err);
        $state.go('register');
      });
    };

    $scope.register = function() {
      $scope.processing = true;
      Auth.registerVerified($scope.data.name, $stateParams.eid, $stateParams.inviteCode).then(function() {
        $state.go('home');
      }, function (err) {
        $scope.processing = false;
        $scope.errorMessage = 'Server error.';
        console.log('Got an error '+JSON.stringify(err));
      });
    };

    $scope.data = {name:'', phoneNumber:''};
    $scope.verified = true;
    $scope.loading = false;
    $scope.processing = false;
    Auth.authenticate().then(function (user) {
      if (user) {
        $state.go('home');
      } else {
        $scope.getNameAndPhone();
      }
    }, function (err) {
      $scope.loading = false;
      console.log(err);
      $state.go('register');
    });
  }]);
