/* global angular,_ */
'use strict';

angular.module('core').controller('LoadingController', ['$scope', '$state', 'Auth',
  function ($scope, $state, Auth) {
    Auth.authenticate().then(function (user) {
      if (user) {
        $state.go('verified');
      } else {
        $state.go('welcome');
      }
    }, function(err) {
      //not sure what to do here.
      $scope.message = 'Unable to load. '+err;
    });
  }]);
