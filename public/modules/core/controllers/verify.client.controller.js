/* global angular,_ */
'use strict';

angular.module('core').controller('VerifyController', ['$scope', '$state', 'Auth', 'UrlOpenHandler',
  function ($scope, $state, Auth, UrlOpenHandler) {
    $scope.auth = Auth;
    $scope.UrlOpenHandler = UrlOpenHandler;
  }]);
