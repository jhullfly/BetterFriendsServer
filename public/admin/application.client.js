/* globals angular */
'use strict';

angular.module('admin', ['ionic']);

// routes
angular.module('admin').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('smsMessages', {
        url: '/smsMessages',
        templateUrl: '/admin/smsMessages.client.view.html',
        controller: 'SmsMessagesController'
      });
    $urlRouterProvider.otherwise('/smsMessages');
  }
]);

angular.module('admin').controller('SmsMessagesController', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('/smsMessages/all').then(function (res) {
      $scope.smsMessages = res.data;
    });
  }
]);
