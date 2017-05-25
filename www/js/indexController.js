app.controller('indexController', function($scope, $http, mainFactory, $cookies, $location, $state) {

		$scope.signInTrainer = function(trainer) {
			mainFactory.signInTrainer(trainer, function(oneTrainer){
				var id = oneTrainer.trainer.id
				// $http.defaults.headers.common.Authorization = oneTrainer.token;
				// $cookies.putObject('userCookie', oneTrainer.trainer);
				window.localStorage['savedUser'] = angular.toJson(oneTrainer.trainer)
				var token = window.localStorage['authToken'] = angular.toJson(oneTrainer.token)
				$http.defaults.headers.common.Authorization = angular.fromJson(token || '[]')
				$scope.signedIn = true
				$state.transitionTo('trainers')
			})
		}

    $scope.signOutUser = function(user){
        $scope.signedIn = false;
        $http.defaults.headers.common.Authorization = '[]';
        window.localStorage['savedUser'] = '[]'
        window.localStorage['authToken'] = '[]'
        $scope.signedIn = false;
        clearForm();
        $state.go('index');
    }; 

		var clearForm = function() {
			$scope.trainer = null;
		}
})