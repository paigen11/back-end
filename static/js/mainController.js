$(function () {
  $('[data-toggle="popover"]').popover()
})

var janusApp = angular.module('janusApp', ['ngRoute', 'ngCookies', 'editableBinding', 'ngMask'])
janusApp.controller('mainController', function($scope, $http, $location, $cookies, $timeout, $route){
//===================
// -- VARIABLES --
//===================
	var path = 'http://localhost:5000/';

	checkUsername()


//===================
// -- LOAD NOTES --
//===================

	if ($location.path() == '/dash' && $scope.loggedIn) {
    	loadPosts();
	}

	function loadPosts() {
	    $http.post('/get_notes', {
	        username: $scope.username
	    }).then(function success(response) {
	        $scope.notes = response.data;
	        console.log($scope.notes)
	        $timeout(function() {
	            $('.grid').masonry({
	                // set itemSelector so .grid-sizer is not used in layout
	                itemSelector: '.grid-item',
	                // use element for option
	                // columnWidth: function( containerWidth ) { return containerWidth / columns; }
	                percentPosition: true
	            });
	        }, 400)
	    })
	}

//===================
// -- MODAL --
//===================
$scope.openModal = function($event, note){
	$scope.title = note[0];
	$scope.content = note[1];
	$scope.id = note[3];
	console.log($scope.id);
    $('#inputModal').css({
	    // top: e.clientY, 
	    // left: e.clientX, 
	    // transform: 'scale(0.2, 0.2)'
    });
    $('#inputModal').modal()
}

$scope.openTutorialModal = function($event){
	$scope.title = 'To edit the title, click here';
	$scope.content = 'To edit the content, click here. Push "save" to save your new note. Push "delete" to delete your note. And you\'re done!' 
	$scope.hideTutorial = true;
	$('#inputTutorialModal').modal();
}

//===================
// -- EDIT NOTE --
//===================
$scope.editNote = function(){
	var notes = {
		title: $scope.title,
		contents: $scope.content,
		username: $scope.username,
		id: $scope.id
	}
	$http.post(path + 'edit_note', notes)
		.then(function successCallback(response){
			if(response.data == 'note saved'){
				loadPosts();
				$route.reload();
			}
		})	
}

//===================
// -- DELETE NOTE --
//===================
$scope.deleteNote = function(){
	var notes = {
		title: $scope.title,
		contents: $scope.content,
		username: $scope.username,
		id: $scope.id
	}
	$http.post(path + 'delete_note', notes)
		.then(function successCallback(response){
			if(response.data == 'note deleted'){
				loadPosts();
				$route.reload();
			}
		})	
}

//===================
// -- REGISTER --
//===================
	$scope.register = function(){
		if($scope.password != $scope.password2){
			$scope.passwordNoMatch = true;
			$timeout(function(){
					$scope.passwordNoMatch = false;
			}, 1500);
		}else{
			$http.post(path + 'register_submit', {
				username: $scope.username,
				firstname: $scope.firstName,
				lastname: $scope.lastName,
				email: $scope.email,
				password: $scope.password,
				phone: $scope.phone
			}).then(function successCallback(response){
				if(response.data == 'reg successful'){
					$scope.regSuccessful = true;
					$scope.login();
					console.log('i did ittttt')
				}
				else if(response.data = 'username taken'){
					$scope.loggedIn = false;
					$scope.usernameTaken = true;
					$timeout(function(){
						$scope.usernameTaken = false;
				}, 1500);
				}
			})
		}	
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
				$scope.badUser = true;
				$timeout(function(){
					$scope.badUser = false;
			}, 1500);
			}
			else if(response.data == 'login successful'){
				$scope.loggedIn = true;
				$scope.signedInAs = $scope.username;
				$cookies.put('username', $scope.username);
				$timeout(function(){
					$('.dropdown.open .dropdown-toggle').dropdown('toggle');
				}, 2000);
				$location.path('/dash');
			}
		})
	}

	$scope.triggerSignUp = function() {
    	$timeout(function() {
        	angular.element('#sign-up-btn').trigger('click');
        }, 100);
	};
//===================
// -- LOGOUT --
//===================
	$scope.logout = function(){
		$cookies.remove('username');
		$scope.signedInAs = null;
		$scope.loggedIn = false;
	}


//===================
// -- SUBMIT NEW NOTE --
//===================
	$scope.submitNewNote = function(){
		console.log($scope.username)
		var notes = {
			title: $scope.noteTitle,
			contents: $scope.noteContent,
			username: $scope.username
		}
		console.log(notes);
		//Getting 404 error in the post here - let's work on this
		$http.post('/new_note', notes)
			.then(function successCallback(response){
			if(response.data == 'new note saved!'){
				console.log('note saved!');
			}
		})	
	}

//===================
// -- LOG RECOGNIZED USER IN AUTOMATICALLY --
//===================
	function checkUsername(){
		if($cookies.get('username') != null){
			$scope.loggedIn = true;
			$scope.username = $cookies.get('username');
			$location.path ('/dash');
			 console.log('user found');
		}else if ($cookies.get('username') == undefined){
			$scope.loggedIn = false;
			console.log('not logged in user');
		}
	}	

});

janusApp.config(function($routeProvider){
	$routeProvider.when('/dash', {
		templateUrl: '/static/partials/dash.html',
		controller: 'mainController'
	})
})

.directive('toggle', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			if (attrs.toggle=='popover'){
				$(element).popover();
			}
		}
	};
})