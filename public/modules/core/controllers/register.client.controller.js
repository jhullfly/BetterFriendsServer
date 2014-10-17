/* global angular,_ */
'use strict';

angular.module('core').controller('RegisterController', ['$scope', '$state', '$ionicPopover', 'Auth',
  function ($scope, $state, $ionicPopover, Auth) {
    $ionicPopover.fromTemplateUrl('name-info.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.namePopover = popover;
    });

    $ionicPopover.fromTemplateUrl('phone-info.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.phonePopover = popover;
    });

    $scope.openNamePopover = function($event) {
      $scope.namePopover.show($event);
    };
    $scope.closeNamePopover = function() {
      $scope.namePopover.hide();
    };
    $scope.openPhonePopover = function($event) {
      $scope.phonePopover.show($event);
    };
    $scope.closePhonePopover = function() {
      $scope.phonePopover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.namePopover.remove();
      $scope.phonePopover.remove();
    });

    $scope.data = {name:'', phoneNumber:''};
    $scope.processing = false;
    $scope.register = function() {
      $scope.processing = true;
      Auth.sendConfirmCode($scope.data.name, $scope.data.phoneNumber).then(function () {
        $state.go('verify');
      }, function (err) {
        //TODO: fix this.
        console.log('Got an error '+JSON.stringify(err));
      });
    };
  }]);
