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
        if (parts[0].indexOf('verify')!==-1 && parts.length > 1) {
          var query = parts[1];
          var code = getQueryVariable(query, 'code');
          $state.go('verifying', {confirmCode: code});
          return;
        } else if (parts[0].indexOf('cookiedata')!==-1 && parts.length > 1) {
          var query2 = parts[1];
          var data = getQueryVariable(query2, 'data');
          if (data) {
            // have to remove leading 'j:'
            var jsonData = JSON.parse(data.substring(2));
            $state.go('registerVerified', {eid:jsonData.eid, inviteCode: jsonData.inviteCode});
            return;
          } else {
            $state.go('register');
            return;
          }
        }
        $state.go('home');
      };
    }
  ]
);
