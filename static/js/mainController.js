var janusApp = angular.module('janusApp', ['ngRoute', 'ngCookies'])
janusApp.controller('mainController', function($scope, $http, $location, $cookies, $timeout){

	$scope.test = "test!"

})


janusApp.config(function($routeProvider){
	$routeProvider.when('/dash', {
		templateUrl: '/static/partials/dash.html',
		controller: 'mainController'
	})
})