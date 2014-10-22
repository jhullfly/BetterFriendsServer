/* globals angular */
'use strict';

angular.module('core').controller('HomeController', ['$scope', '$state',
	function($scope, $state) {
    $state.go('invite');
	}
]);