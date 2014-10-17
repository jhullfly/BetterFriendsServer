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
      .state('verified', {
        url: '/verified',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/verified.client.view.html',
        controller: 'VerifiedController'
      })
      .state('invite', {
        url: '/invite',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/invite.client.view.html',
        controller: 'InviteController'
      })
      .state('compose', {
        url: '/compose',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/compose.client.view.html',
        controller: 'ComposeController'
      });

    $urlRouterProvider.otherwise('/loading');
  }
]);

angular.module('core')
  .run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      /* TODO: replace with anon and auth'ed pages.
      if (toState.url !== '/loading' && toState.url !== '/verifying' && Auth.user === null){
        // User isn’t authenticated
        $state.go('loading');
        event.preventDefault();
      }
      */
    });
  }]);