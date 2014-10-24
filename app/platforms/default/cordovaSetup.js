'use strict';
// this file is replaced by platform.

var cordovaModuleName = 'ngCordovaMocks';
var cordovaInitialize = ['$cordovaContacts', '$cordovaSms', '$cordovaDevice',
  function ($cordovaContacts, $cordovaSms, $cordovaDevice) {
    // for testing. Use local storage so we can get a new uuid with an incognito window
    var uuid = localStorage.getItem('uuid');
    if (!uuid) {
      var randomNum = Math.floor((Math.random() * 10000) + 10000);
      uuid = 'fake-uuid-' + randomNum;
      localStorage.setItem('uuid', uuid);
    }
    $cordovaDevice.uuid = uuid;
    $cordovaContacts.contacts = [
      {
        name: {
          formatted: 'Jamie One'
        },
        phoneNumbers: [
          {
            type: 'mobile',
            value: '(111) 111-1111'
          }
        ]
      },
      {
        name: {
          formatted: 'Homie ThreeFour'
        },
        phoneNumbers: [
          {
            type: 'mobile',
            value: '(333) 333-3333'
          },
          {
            type: 'home',
            value: '(444) 444-444'
          }
        ]
      },
      {
        name: {
          formatted: 'Bob Two'
        },
        phoneNumbers: [
          {
            type: 'mobile',
            value: '(222) 222-2222'
          }
        ]

      },
      {
        name: {
          formatted: 'Lorri Five'
        },
        phoneNumbers: [
          {
            type: 'mobile',
            value: '(555) 555-5555'
          }
        ]

      },
      {
        name: {
          formatted: 'Vanessa Six'
        },
        phoneNumbers: [
          {
            type: 'mobile',
            value: '(666) 666-6666'
          }
        ]

      },
      {
        name: {
          formatted: 'Jesse Hull'
        },
        phoneNumbers: [
          {
            type: 'mobile',
            value: '(510967-4275'
          }
        ]

      },
      {
        name: {
          formatted: 'Bad Number'
        },
        phoneNumbers: [
          {
            type: 'mobile',
            value: '(510) 967-42'
          }
        ]

      },
      {
        name: {
          formatted: 'Jesse Test'
        },
        phoneNumbers: [
          {
            type: 'mobile',
            value: '(415) 629-2070'
          }
        ]

      },
      {
        name: {
          formatted: 'Lonely Smith'
        },
        phoneNumbers: [
          {
            type: 'mobile'
          }
        ]

      }
    ];
    /*    $cordovaSms.setScripts([{
     success:true,
     message:"sent"
     }, {
     success:false,
     message:"canceled"
     }]);*/
  }];