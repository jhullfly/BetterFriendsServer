/* global angular, BASE_URL */
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('welcome', {
        url: '/welcome',
        templateUrl: BASE_URL + '/modules/core/views/welcome.client.view.html',
        controller: 'WelcomeCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: BASE_URL + '/modules/core/views/register.client.view.html',
        controller: 'RegisterCtrl'
      })
      .state('verify', {
        url: '/verify',
        templateUrl: BASE_URL + '/modules/core/views/verify.client.view.html',
        controller: 'VerifyCtrl'
      })
      .state('invite', {
        url: '/invite',
        templateUrl: BASE_URL + '/modules/core/views/invite.client.view.html',
        controller: 'InviteCtrl'
      })
      .state('compose', {
        url: '/compose',
        templateUrl: BASE_URL + '/modules/core/views/compose.client.view.html',
        controller: 'ComposeCtrl'
      });

    $urlRouterProvider.otherwise('/welcome');
  }
]);