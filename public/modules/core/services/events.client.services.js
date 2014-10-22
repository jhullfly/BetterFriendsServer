/* global angular,ApplicationConfiguration */
'use strict';

angular.module('core')
 .service('Events', ['$http', '$q', 'Auth',
    function ($http, $q, Auth) {
      this.createAndInvite = function(messages) {
        var event = {
          invited: [
            {
              phoneNumber: messages[0].phoneNumber,
              message : messages[0].message,
              status: 'invited',
              invitedOn: new Date(),
              invitedBy: Auth.user._id
            },
            {
              phoneNumber: messages[1].phoneNumber,
              message : messages[1].message,
              status: 'invited',
              invitedOn: new Date(),
              invitedBy: Auth.user._id
            }
          ],
          creator: Auth.user._id,
          when: new Date() //TODO: fix
        };
        var url = ApplicationConfiguration.baseUrl + '/event/createAndInvite';
        return $http.post(url, event).then(function (res) {
          return res.data;
        });
      };
  }]);


