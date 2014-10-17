/* globals ApplicationConfiguration, angular, cordova, StatusBar */
'use strict';

function handleOpenUrlInternal(url) {
  var root = angular.element(document.body).scope();
  root.urlHandlerCallback(url);
}

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies)

// Setting HTML5 Location Mode
.config(['$locationProvider', '$sceDelegateProvider',
	function($locationProvider, $sceDelegateProvider) {
		$locationProvider.hashPrefix('!');
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
        ApplicationConfiguration.baseUrl+'/**'
    ]);
	}
])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.run(['$rootScope', 'UrlOpenHandler', function($rootScope, UrlOpenHandler) {
  $rootScope.urlHandlerCallback = function(url) {
    console.log('got back into angular '+url);
    UrlOpenHandler.handleUrl(url);
  };
}])


.run(ApplicationConfiguration.cordovaInitialize)

.run(function() {
    if (ApplicationConfiguration.cordovaStartupUrl) {
      setTimeout(function() {handleOpenUrlInternal(ApplicationConfiguration.cordovaStartupUrl);}, 200);
    }
  });

