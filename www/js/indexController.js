app.controller('indexController', function($scope, $http, mainFactory, $cookies, $location, $state) {

		$scope.signInTrainer = function(trainer) {
			var email = trainer.email.toLowerCase()
			trainer.email = email
			mainFactory.signInTrainer(trainer, function(oneTrainer){
				var id = oneTrainer.trainer.id
				// $http.defaults.headers.common.Authorization = oneTrainer.token;
				// $cookies.putObject('userCookie', oneTrainer.trainer);
				window.localStorage['savedUser'] = angular.toJson(oneTrainer.trainer)
				window.localStorage['authToken'] = angular.toJson(oneTrainer.token)
				var token = angular.fromJson(window.localStorage['authToken'])
				$http.defaults.headers.common.Authorization = token
				$scope.signedIn = true
				$state.transitionTo('trainers')
			})
		}

    $scope.signOutUser = function(user){
        $scope.signedIn = false;
        $http.defaults.headers.common.Authorization = '';
        window.localStorage['savedUser'] = ''
        window.localStorage['authToken'] = ''
        $scope.signedIn = false;
        clearForm();
        $state.go('index');
    }; 

		var clearForm = function() {
			$scope.trainer = null;
		}
})