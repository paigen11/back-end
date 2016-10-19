var janusApp = angular.module('janusApp', ['ngRoute', 'ngCookies', 'editableBinding', 'ngMask', 'ngSanitize'])
janusApp.controller('mainController', function($scope, $http, $location, $cookies, $timeout, $route){
//===================
// -- VARIABLES --
//===================
	var path = 'http://localhost:5000/';

	checkUsername()
	$scope.notes = [];

//===================
// -- LOAD NOTES INIT --
//===================

	if ($location.path() == '/dash' && $scope.loggedIn) {
    	loadPosts();
    	
	}

//===================
// -- LOAD NOTES --
//===================
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
	        }, 500)
	    })
	}

//===================
// -- MODALS --
//===================
$scope.openModal = function($event, note, index){
	$scope.editing = true;
	$scope.openNote = index;
	$scope.title = note[0];
	$scope.content = note[1];
	$scope.id = note[3];
	$scope.noteColor = note[4];
    $('#inputModal').css({
	    // top: e.clientY, 
	    // left: e.clientX, 
	    // transform: 'scale(0.2, 0.2)'
    });
    $('#inputModal').modal()
}

function tutorialModal(){
	$('#inputTutorialModal').modal();
}

$scope.help = function(){
	tutorialModal();
	$location.path('/dash');
}

//===================
// -- TUTORIAL DONE --
//===================
$scope.tutorialDone = function(){
	console.log('tut_done');
	$http.post(path + 'tut_done', {
		username: $scope.username,
		tut_done: 1
	}).then(function successCallback(response){
		if(response.data == 'tutSaved'){
			console.log('tutorial done');
		}
	})
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
				$scope.openNote = undefined;
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
					setTimeout(tutorialModal, 1000);
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

		var newNote = {
			title: $scope.noteTitle,
			contents: $scope.noteContent,
			username: $scope.username
		}
		//Getting 404 error in the post here - let's work on this
		$http.post('/new_note', newNote)
			.then(function successCallback(response){
				
				loadPosts()
				// $route.reload()	
			
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

//===================
// -- CHANGE COLOR--
//===================

	$scope.setColor = function(color) {
		$scope.noteColor = color;
		$scope.notes[$scope.openNote][5] = color;
		console.log($scope.notes[$scope.openNote][5])
		// $('.note-wrapper:nth-child(' + $scope.openNote + ')').css('background-color', color);
		$http.post('/set_color', { 
			id: $scope.id,
			color: color
		}).then(function success(response){

		})
	}


});





janusApp.config(function($routeProvider){
	$routeProvider.when('/dash', {
		templateUrl: '/static/partials/dash.html',
		controller: 'mainController'
	})
})

