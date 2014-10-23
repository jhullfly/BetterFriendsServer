/* global angular,_ */
'use strict';

// Setting up route
angular.module('core')

  .service('PhoneNumber', function () {
    this.clean = function (num) {
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
    };
  });

