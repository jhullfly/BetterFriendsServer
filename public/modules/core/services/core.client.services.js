/* global angular,_ */
'use strict';

// Setting up route
angular.module('core')

  .service('invited', function () {
    this.contacts = null;
    this.setContacts = function (contacts) {
      this.contacts = contacts;
    };
    this.getContacts = function () {
      return this.contacts;
    };
  })

  .service('cacheContacts', function ($ionicPlatform, $cordovaContacts, $q, $timeout) {
    function cleanNumber(num) {
      if (!num) {
        return null;
      }
      var cleaned = '';
      for(var i = 0 ; i < num.length ; i++) {
        var c = num.charAt(i);
        if (/[0-9]/.test(c)) {
          cleaned = cleaned+c;
        }
      }
      if (cleaned.length === 11 && cleaned.charAt(0)==='1') {
        // remove leading 1
        cleaned = cleaned.substring(1);
      }
      if (cleaned.length === 10) {
        return cleaned;
      } else {
        return null;
      }
    }
    function flattenAndFilterContacts(contacts) {
      var filteredContacts = _.filter(contacts, function (contact) {
        return contact.phoneNumbers && contact.phoneNumbers.length > 0;
      });
      var newContacts = [];
      _.each(filteredContacts, function (contact) {
        var filteredNumbers = _.filter(contact.phoneNumbers, function (num) {
          var cleaned = cleanNumber(num.value);
          if (cleaned) {
            num.cleanedValue = cleaned;
            return true;
          } else {
            return false;
          }
        });
        if (filteredNumbers.length === 1) {
          contact.phoneNumber = filteredNumbers[0];
          newContacts.push(contact);
        } else {
          _.each(filteredNumbers, function (num) {
            var newContact = _.clone(contact);
            num.displayType = num.type;
            newContact.phoneNumber = num;
            newContacts.push(newContact);
          });
        }
      });
      return newContacts;
    }

    function loadContacts() {
      return $ionicPlatform.ready().then(function () {
        var options = {
          filter: '',
          multiple: true,
          desiredFields: [],
          fields: ['*']
        };
        return $cordovaContacts.find(options).then(function (contacts) {
          var deferred = $q.defer();
          deferred.resolve(flattenAndFilterContacts(contacts));
          return deferred.promise;
        });
      });
    }

    this.contacts = loadContacts();
    this.getContacts = function () {
      var deferred = $q.defer();
      deferred.resolve(this.contacts);
      return deferred.promise;
    };
  });

