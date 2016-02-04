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
  function($scope) {

  }
])

app.factory("")
