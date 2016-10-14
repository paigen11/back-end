var janusApp = angular.module('janusApp', ['ngRoute', 'ngCookies'])
janusApp.controller('mainController', function($scope, $http, $location, $cookies, $timeout){
//===================
// -- VARIABLES --
//===================
	var path = 'http://localhost:5000/';
//===================
// -- REGISTER --
//===================
	$scope.register = function(){
		$http.post(path + 'register_submit', {
			username: $scope.username,
			password: $scope.password,
			avatar: $scope.avatar
		}).then(function successCallback(response){
			if(response.data == 'reg successful'){
				// $scope.login();
				console.log('i did ittttt')
				$('.dropdown.open .dropdown-toggle').dropdown('toggle');
			}
			//load user notes
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
			if (response.data){
				$scope.loggedIn = true;
				$scope.signedInAs = $scope.username;
				$cookies.put('username', $scope.username);
				$scope.avatar = response.data;
				$cookies.put('avatar', $scope.avatar)
			}
			//load user notes
		})
	}
//===================
// -- LOGOUT --
//===================
	$scope.logout = function(){
		$cookies.remove('username');
		$cookies.remove('avatar');
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
