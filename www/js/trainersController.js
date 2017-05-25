app.controller('trainersController', function($scope, $http, mainFactory, $cookies, $location, $state) {

		if(!$cookies.getObject('userCookie')){
			$state.go('index')
		} else {
			var trainer_id = $cookies.getObject('userCookie').id
		}

		mainFactory.getTrainersTrainees(trainer_id, function(data) {
			// console.log($http.defaults.headers.common.Authorization)
			$scope.trainees = data.data
		})

		$scope.showTrainee = function(trainee) {
			$state.go('trainee', {id: trainee.id})
		}

})