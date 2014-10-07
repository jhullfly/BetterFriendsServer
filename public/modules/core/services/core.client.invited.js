'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('invite', {
                url: '/invite',
                templateUrl: 'modules/core/views/invite.client.view.html',
                controller: 'InviteCtrl'
            })
            .state('compose', {
                url: '/compose',
                templateUrl: 'modules/core/views/compose.client.view.html',
                controller: 'ComposeCtrl'
            });

        $urlRouterProvider.otherwise('/invite');
	}
]);