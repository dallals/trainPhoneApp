app.controller('indexController', function($scope, $http, mainFactory, $cookies, $location, $state) {

		$scope.signInTrainer = function(trainer) {
			mainFactory.signInTrainer(trainer, function(oneTrainer){
				var id = oneTrainer.trainer.id
				$http.defaults.headers.common.Authorization = oneTrainer.token;
				$cookies.putObject('userCookie', oneTrainer.trainer);
				$scope.signedIn = true
				console.log($state.go('trainers'));
				$state.transitionTo('trainers')
				// $location.path('/trainers/'+id)
			})
		}
})