var app = angular.module('spotify-rankify', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl',
		})

		.state('login', {
			url: '/login',
			templateUrl: '/login.html',
			controller: 'AuthCtrl',
			onEnter: [$state, auth, function($state, auth) {
				if (auth.isLoggedIn()) {
					$state.go('home');
				}
			}]
		})

		.state('register', {
			url: '/register',
			templateUrl: '/register.html',
			controller: 'AuthCtrl',
			onEnter: [$state, auth, function($state, auth) {
				if (auth.isLoggedIn()) {
					$state.go('home');
				}
			}]
		});

		$urlRouterProvider.otherwise('home');
	}
]);

app.controller("MainCtrl", [
  '$scope',
  function($scope) {
    $scope.title = "Rankify";
  }]);

app.controller("AuthCtrl", [
  $scope,
  $state,
  auth,
  function($scope, $state, auth) {

  }
]);

app.factory('auth', ['$http', '$window', function($http, $window) {
  var auth = {};

  /*
    Saves our JWToken in the localStorage object under session-token key
    $window refers to the browser's window object (Same as JS interpretation)
  */
  auth.saveToken = function(token) {
    $window.localStorage['session-token'] = token;
  };

  /*
    Helper for checking user status
  */
  auth.getToken = function() {
    return $window.localStorage['session-token'];
  };

  auth.isLoggedIn = function() {
    var token = auth.getToken();
    if (token) {
      // If session has a token, check to see when it expires.
      var payload = JSON.parse($window.atob(token.split(.)[1]));
      return payload.expiry > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.logIn = function(user) {
    return $http.post('/login', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logOut = function() {
    $window.localStorage.removeItem('session-token');
  };

  auth.register = function(user) {
    return $http.post('/register', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  return auth;
}]);
