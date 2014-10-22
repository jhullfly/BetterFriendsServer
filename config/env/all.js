'use strict';

module.exports = {
  app: {
    title: 'betterFriends',
    description: 'Life is better with friends',
    keywords: 'MongoDB, Express, AngularJS, Node.js'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  assets: {
    lib: {
      css: [
        'public/lib/ionic/css/ionic.css'
      ],
      js: [
        'public/lib/lodash/dist/lodash.js',
        'public/lib/ionic/js/ionic.bundle.js'
      ]
    },
    css: [
      'public/modules/**/css/*.css'
    ],
    // this is handled specially because loading order is very important.
    cordovajs: [
      'platforms/cordovaSetup.js'
    ],
    js: [
      'public/config.js',
      'public/application.js',
      'public/modules/*/*.js',
      'public/modules/*/*[!tests]*/*.js'
    ],
    tests: [
      'public/lib/angular-mocks/angular-mocks.js',
      'public/modules/*/tests/*.js'
    ]
  }
};