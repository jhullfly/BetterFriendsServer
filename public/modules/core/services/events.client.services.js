/* global angular,ApplicationConfiguration,_ */
'use strict';

angular.module('core')
 .service('Events', ['$http', '$q', 'Auth',
    function ($http, $q, Auth) {
      function calculateAttendees(event) {
        event.attending = [];
        event.notResponded = [];
        event.declined = [];
        // the creator is attending.
        event.attending.push({
          name: event.creator.name,
          phoneNumber: event.creator.phoneNumber,
          inviteOn: event.created,
          repliedOn: event.created,
          created: true
        });
        _.each(event.invited, function(invitee) {
          if (invitee.status === 'accepted') {
            event.attending.push(invitee);
          } else if (invitee.statue === 'declined') {
            event.declined.push(invitee);
          } else {
            event.notResponded.push(invitee);
          }
        });
        return event;
      }
      this.createAndInvite = function(messages) {
        var event = {
          invited: [
            {
              name : messages[0].name,
              phoneNumber: messages[0].phoneNumber,
              message : messages[0].message,
              status: 'invited',
              invitedOn: new Date(),
              invitedBy: Auth.user._id
            },
            {
              name : messages[1].name,
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
        var url = ApplicationConfiguration.baseUrl + '/auth/event/createAndInvite';
        return $http.post(url, event, {headers: {'X-Device-UUID':Auth.user.uuid}}).then(function (res) {
          return res.data;
        });
      };
      this.get = function(eid) {
        var url = ApplicationConfiguration.baseUrl + '/auth/event/get/'+eid;
        return $http.get(url, {headers: {'X-Device-UUID':Auth.user.uuid}}).then(function (res) {
          console.log(JSON.stringify(res.data));
          return calculateAttendees(res.data.event);
        });
      };
  }]);


