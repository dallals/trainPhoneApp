app.controller('addExerciseController', ["$scope", 'mainFactory','$http', '$location', '$cookies', '$stateParams', '$state',
	function($scope, mainFactory, $http, $location, $cookies, $stateParams, $state){

		$scope.addWorkOut = function(exercise) {
			mainFactory.addExercise(exercise, function(data){
				$state.go('trainee')
			})
		}

}])