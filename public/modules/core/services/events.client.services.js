/* global angular,ApplicationConfiguration,_, moment */
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
      function nextMonday8pm() {
        return moment().day(8).hours(20).minutes(0).seconds(0).milliseconds(0);
      }
      this.createOrUpdateAndInvite = function(eid, messages) {
        if (eid === 'new') {
          return this.createAndInvite(messages);
        } else {
          return this.addInvited(eid, messages);
        }
      };
      function buildInvited(messages) {
        return [
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
        ];
      }
      this.createAndInvite = function(messages) {
        var event = {
          invited: buildInvited(messages),
          creator: Auth.user._id,
          when: nextMonday8pm()
        };
        var url = ApplicationConfiguration.baseUrl + '/auth/event/createAndInvite';
        return $http.post(url, event, {headers: {'X-Device-UUID':Auth.user.uuid}}).then(function (res) {
          return res.data;
        });
      };
      this.addInvited = function(eid, messages) {
        var invited = buildInvited(messages);
        var url = ApplicationConfiguration.baseUrl + '/auth/event/addInvited/'+eid;
        return $http.post(url, invited, {headers: {'X-Device-UUID':Auth.user.uuid}}).then(function (res) {
          return calculateAttendees(res.data.event);
        });
      };
      this.all = function(eid) {
        var url = ApplicationConfiguration.baseUrl + '/auth/event/all';
        return $http.get(url, {headers: {'X-Device-UUID':Auth.user.uuid}}).then(function (res) {
          return res.data;
        });
      };
      this.get = function(eid) {
        var url = ApplicationConfiguration.baseUrl + '/auth/event/get/'+eid;
        return $http.get(url, {headers: {'X-Device-UUID':Auth.user.uuid}}).then(function (res) {
          return calculateAttendees(res.data.event);
        });
      };
      this.getAnon = function(eid, inviteCode) {
        var url = ApplicationConfiguration.baseUrl + '/event/get/'+eid+'/'+inviteCode;
        return $http.get(url).then(function (res) {
          return res.data;
        });
      };
  }]);


