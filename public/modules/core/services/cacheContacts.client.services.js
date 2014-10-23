/* global angular,_ */
'use strict';

// Setting up route
angular.module('core')

  .service('cacheContacts', function ($ionicPlatform, $cordovaContacts, $q, $timeout, PhoneNumber) {
    function flattenAndFilterContacts(contacts) {
      var filteredContacts = _.filter(contacts, function (contact) {
        return contact.phoneNumbers && contact.phoneNumbers.length > 0;
      });
      var newContacts = [];
      _.each(filteredContacts, function (contact) {
        var filteredNumbers = _.filter(contact.phoneNumbers, function (num) {
          var cleaned = PhoneNumber.clean(num.value);
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

