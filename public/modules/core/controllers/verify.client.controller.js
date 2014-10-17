/* global angular,_ */
'use strict';

angular.module('core').controller('VerifyController', ['$scope', '$state', 'Auth',
  function ($scope, $state, Auth) {
    $scope.auth = Auth;
  }]);
