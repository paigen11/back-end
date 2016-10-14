var janusApp = angular.module('janusApp', ['ngRoute', 'ngCookies'])
janusApp.controller('mainController', function($scope, $http, $location, $cookies, $timeout){
//===================
// -- VARIABLES --
//===================
	var path = 'http://localhost:5000/';

//===================
// -- MASONRY --
//===================

	$('.grid').masonry({
			// set itemSelector so .grid-sizer is not used in layout
		itemSelector: '.grid-item',
		// use element for option
		// columnWidth: 200,
		percentPosition: true
	});

//===================
// -- REGISTER --
//===================
	$scope.register = function(){
		$http.post(path + 'register_submit', {
			username: $scope.username,
			firstname: $scope.firstName,
			lastname: $scope.lastName,
			email: $scope.email,
			password: $scope.password,
			phone: $scope.phone
		}).then(function successCallback(response){
			if(response.data == 'reg successful'){
				$scope.login();
				console.log('i did ittttt')
			}
			else if(response.data = 'username taken'){
				$scope.loggedIn = false;
				$scope.usernameTaken = true;
			}
		})

	}
//===================
// -- LOGIN --
//===================
	$scope.login = function(){
		$http.post(path + 'login_submit', {
			username: $scope.username,
			password: $scope.password
		}).then(function successCallback(response){
			console.log(response.data);
			if(response.data == 'no match'){
				$scope.loggedIn = false;
				$scope.noMatch = true;
			}
			else if(response.data == 'login successful'){
				$scope.loggedIn = true;
				$scope.signedInAs = $scope.username;
				$cookies.put('username', $scope.username);
				$('.dropdown.open .dropdown-toggle').dropdown('toggle');
			}
		})
	}
//===================
// -- LOGOUT --
//===================
	$scope.logout = function(){
		$cookies.remove('username');
		$scope.signedInAs = null;
		$scope.loggedIn = false;
	}

})

janusApp.config(function($routeProvider){
	$routeProvider.when('/dash', {
		templateUrl: '/static/partials/dash.html',
		controller: 'mainController'
	})

})