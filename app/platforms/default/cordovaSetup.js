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
            value : '(415) 111-1111'
        }]
    }, {
        name : {
            formatted: 'Homie Smith'
        },
        phoneNumbers : [{
            type: 'mobile',
            value: '(415) 333-3333'
        },{
            type : 'home',
            value : '(415) 444-444'
        }]
    }, {
        name : {
            formatted: 'Bob Smith'
        },
        phoneNumbers : [{
            type : 'mobile',
            value : '(415) 222-2222'
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