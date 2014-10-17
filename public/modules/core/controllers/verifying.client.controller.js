/* global angular */
'use strict';

angular.module('core').controller('VerifyingController', ['$scope', '$state', '$stateParams', 'Auth',
	function($scope, $state, $stateParams, Auth) {
    Auth.register($stateParams.confirmCode).then(function(result) {
      if (result.success) {
        $state.go('verified');
      } else {
        $scope.errorMessage = result.message;
      }
    }, function (err) {
      $scope.errorMessage = JSON.stringify(err);
    });
	}
]);