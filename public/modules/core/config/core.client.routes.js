/* global angular, ApplicationConfiguration */
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('loading', {
        url: '/loading',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/loading.client.view.html',
        controller: 'LoadingController',
        authenticated: false
      })
      .state('welcome', {
        url: '/welcome',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/welcome.client.view.html',
        controller: 'WelcomeController',
        authenticated: false
      })
      .state('register', {
        url: '/register',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/register.client.view.html',
        controller: 'RegisterController',
        authenticated: false
      })
      .state('registerVerified', {
        url: '/registerVerified/:eid/:inviteCode',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/register.client.view.html',
        controller: 'RegisterVerifiedController',
        authenticated: false
      })
      .state('verify', {
        url: '/verify',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/verify.client.view.html',
        controller: 'VerifyController',
        authenticated: false
      })
      .state('verifying', {
        url: '/verifying/:confirmCode',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/verifying.client.view.html',
        controller: 'VerifyingController',
        authenticated: false
      })
      .state('home', {
        url: '/home',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/home.client.view.html',
        controller: 'HomeController',
        authenticated: true
      })
      .state('event', {
        url: '/event/:eid',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/event.client.view.html',
        controller: 'EventController',
        authenticated: true,
        abstract: true
      })
      .state('event.detail', {
        url: '/detail',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/event.detail.client.view.html',
        authenticated: true
      })
      .state('event.invite', {
        url: '/invite',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/event.invite.client.view.html',
        controller: 'InviteController',
        authenticated: true
      })
      .state('event.compose', {
        url: '/compose',
        templateUrl: ApplicationConfiguration.baseUrl + '/modules/core/views/event.compose.client.view.html',
        controller: 'ComposeController',
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
      } else if (!toState.authenticated && Auth.user !== null) {
        $state.go('home');
        event.preventDefault();
      }
    });
  }]);