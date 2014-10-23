/* global angular, ApplicationConfiguration */
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('loading', {
        url: '/loading',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/loading.client.view.html',
        controller: 'LoadingController'
      })
      .state('welcome', {
        url: '/welcome',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/welcome.client.view.html',
        controller: 'WelcomeController'
      })
      .state('register', {
        url: '/register',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/register.client.view.html',
        controller: 'RegisterController'
      })
      .state('verify', {
        url: '/verify',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/verify.client.view.html',
        controller: 'VerifyController'
      })
      .state('verifying', {
        url: '/verifying/:confirmCode',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/verifying.client.view.html',
        controller: 'VerifyingController'
      })
      .state('home', {
        url: '/home',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/home.client.view.html',
        controller: 'HomeController',
        authenticated: true
      })
      .state('invite', {
        url: '/invite',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/invite.client.view.html',
        controller: 'InviteController',
        authenticated: true
      })
      .state('compose', {
        url: '/compose',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/compose.client.view.html',
        controller: 'ComposeController',
        authenticated: true
      })
      .state('event', {
        url: '/event/:eid',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/event.client.view.html',
        controller: 'EventController',
        authenticated: true
      });

    $urlRouterProvider.otherwise('/loading');
  }
]);

angular.module('core')
  .run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticated && Auth.user === null){
        // User isn’t authenticated
        $state.go('loading');
        event.preventDefault();
      }
    });
  }]);