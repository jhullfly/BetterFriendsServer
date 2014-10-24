/* globals angular */
'use strict';

angular.module('betterfriendsLanding', ['ionic']);

// routes
angular.module('betterfriendsLanding').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('respond', {
        url: '/r/:eid/:inviteCode',
        templateUrl: '/landing/respond.client.view.html',
        controller: 'RespondController'
      })
      .state('accepted', {
        url: '/accepted/:eid/:inviteCode',
        templateUrl: '/landing/accepted.client.view.html',
        controller: 'AcceptedController'
      });
  }
]);

angular.module('betterfriendsLanding').controller('RespondController', ['$scope', '$stateParams', '$state', '$http',
  function ($scope, $stateParams, $state, $http) {
    $scope.accept = function() {
      var data = {newStatus:'accepted'};
      $http.post('/event/updateStatus/'+$stateParams.eid+'/'+$stateParams.inviteCode, data).then(function (res) {
        $state.go('accepted', {eid:$stateParams.eid, inviteCode:$stateParams.inviteCode});
      });
    };
    $http.get('/event/get/'+$stateParams.eid+'/'+$stateParams.inviteCode).then(function (res) {
      $scope.event = res.data.event;
      $scope.invitee = res.data.invitee;
    });
  }
]);

angular.module('betterfriendsLanding').controller('AcceptedController', ['$scope', '$stateParams', '$window', '$timeout', '$http',
  function ($scope, $stateParams, $window, $timeout, $http) {
    $scope.invite = function() {
      var clickedAt = new Date();
      $timeout(function () {
        if (new Date() - clickedAt < 2000) {
          $window.location.href = 'http://www.testflightapp.com/install/ba99bd94a202a6c4b4142ee99b83eac7-MTM3NDk0NTQ/'; //itms-apps://itunes.apple.com/us/app/facebook/id284882215?mt=8&uo=6';
        }
      }, 500);
      var data = {
        eid:$stateParams.eid,
        inviteCode:$stateParams.inviteCode
      };
      var dataString = encodeURIComponent('j:'+JSON.stringify(data));
      $window.location.href = 'betterfriends://cookiedata?data='+dataString;
    };
    $http.get('/event/get/'+$stateParams.eid+'/'+$stateParams.inviteCode).then(function (res) {
      $scope.event = res.data.event;
      $scope.invitee = res.data.invitee;
    });
  }
]);
