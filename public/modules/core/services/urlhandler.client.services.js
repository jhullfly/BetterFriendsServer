/* global angular,ApplicationConfiguration */
'use strict';

// Setting up route
angular.module('core')
 .service('UrlOpenHandler', ['$state', '$http', 'Auth',
    function($state, $http, Auth) {
      function getQueryVariable(query, variable) {
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
          }
        }
        return null;
      }
      this.handleUrl = function (url) {
        console.log('got back into handleUrl '+url);
        var parts = url.split('?');
        if (parts.length <= 1) {
          return;
        }
        var query = parts[1];
        var code = getQueryVariable(query, 'code');
        $state.go('verifying', {confirmCode:code});
      };
    }
  ]
);
