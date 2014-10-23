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
  });



