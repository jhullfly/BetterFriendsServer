/* global angular,_,ApplicationConfiguration */
'use strict';

angular.module('core').controller('WelcomeController', ['$scope', '$state', '$cordovaDevice', '$window',
  function ($scope, $state, $cordovaDevice, $window) {
    $scope.getStarted = function() {
      console.log('platform = ' + $cordovaDevice.getPlatform());
      if ($cordovaDevice.getPlatform() === 'iOS') {
        $window.open(ApplicationConfiguration.baseUrl + '/landing/cookieRedirect.html','_system');
      } else {
        $state.go('register');
      }
    };
  }]);
