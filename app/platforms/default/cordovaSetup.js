'use strict';
// this file is replaced by platform.

var cordovaModuleName = 'ngCordovaMocks';
var cordovaInitialize = ['$cordovaContacts', '$cordovaSms', '$cordovaDevice',
  function($cordovaContacts, $cordovaSms, $cordovaDevice) {
    // for testing
    $cordovaDevice.uuid = 'fake-uuid';
    $cordovaContacts.contacts = [{
        name : {
            formatted: 'Jamie Smith'
        },
        phoneNumbers : [{
            type : 'mobile',
            value : '(111) 111-1111'
        }]
    }, {
        name : {
            formatted: 'Homie Smith'
        },
        phoneNumbers : [{
            type: 'mobile',
            value: '(333) 333-3333'
        },{
            type : 'home',
            value : '(444) 444-444'
        }]
    }, {
      name : {
        formatted: 'Bob Smith'
      },
      phoneNumbers : [{
        type : 'mobile',
        value : '(222) 222-2222'
      }]

    }, {
      name : {
        formatted: 'Jesse Hull'
      },
      phoneNumbers : [{
        type : 'mobile',
        value : '(510967-4275'
      }]

    }, {
      name : {
        formatted: 'Bad Number'
      },
      phoneNumbers : [{
        type : 'mobile',
        value : '(510) 967-42'
      }]

    }, {
      name : {
        formatted: 'Jesse Test'
      },
      phoneNumbers : [{
        type : 'mobile',
        value : '(415) 629-2070'
      }]

    }, {
        name : {
            formatted: 'Lonely Smith'
        },
        phoneNumbers : [{
            type : 'mobile'
        }]

    }];
    /*    $cordovaSms.setScripts([{
     success:true,
     message:"sent"
     }, {
     success:false,
     message:"canceled"
     }]);*/
}];