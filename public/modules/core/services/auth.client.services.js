/* global angular,ApplicationConfiguration */
'use strict';

// Setting up route
angular.module('core')
 .service('Auth', ['$ionicPlatform', '$cordovaDevice', '$http', '$q', 'PhoneNumber',
    function ($ionicPlatform, $cordovaDevice, $http, $q, PhoneNumber) {
      var that = this;
      this.user = null;
      this.pendingPhoneNumber = null;
      this.isAuthenticated = function() {
        return that.user !== null;
      };
      this.authenticate = function() {
        return $ionicPlatform.ready().then(function () {
          var url = ApplicationConfiguration.baseUrl + '/user/get/'+$cordovaDevice.getUUID();
          return $http.get(url).then(function (res) {
            if (res.data.success) {
              that.user = res.data.user;
              return that.user;
            } else {
              return null;
            }
          });
        });
      };
      this.getUser = function() {
        return that.user;
      };
      this.sendConfirmCode = function(name, phoneNumber) {
        phoneNumber = PhoneNumber.clean(phoneNumber);
        if (!phoneNumber) {
          return $q.reject('invalid phonenumber');
        }
        that.pendingPhoneNumber = phoneNumber;
        var url = ApplicationConfiguration.baseUrl + '/user/sendConfirmCode';
        var data = {
          name : name,
          phoneNumber : phoneNumber,
          uuid : $cordovaDevice.getUUID()
        };
        return $http.post(url, data).then(function(res) {
          // when testing we actually get the confirm code.
          if (res.data.testConfirmCode) {
            that.testConfirmCode = res.data.testConfirmCode;
          }
          return res;
        });
      };
      this.register = function(confirmCode) {
        var url = ApplicationConfiguration.baseUrl + '/user/register';
        var data = {
          confirmCode : confirmCode,
          uuid : $cordovaDevice.getUUID()
        };
        return $http.post(url, data).then(function (res) {
          if (res.data.success) {
            that.user = res.data.user;
          }
          return res.data;
        });
      };
  }]);


