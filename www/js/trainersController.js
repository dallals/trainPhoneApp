app.controller('trainersController', function($scope, $http, mainFactory, $cookies, $location, $state, $stateParams, $window) {

		// console.log(angular.fromJson(window.localStorage['savedUser']))

		var trainer_id = angular.fromJson(window.localStorage['savedUser']).id

		mainFactory.getOneTrainer($stateParams.id, function(data){
			$scope.trainer = data.data
		})


		mainFactory.getTrainersTrainees(trainer_id, function(data) {
			$scope.trainees = data.data
		})

		$scope.reloadTrainees = function(){
			mainFactory.getTrainersTrainees(trainer_id, function(data) {
				$scope.trainees = data.data
				$scope.$broadcast('scroll.refreshComplete');
			})
		}

		$scope.showTrainee = function(trainee) {
			$state.go('trainee', {id: trainee.id})
		}

		var clearForm = function() {
			$scope.trainee = null;
		}

		$scope.removeTrainee = function(trainee) {
			mainFactory.removeTrainee(trainee, function(data) {
				$scope.trainees = data.data
			})
		}

		$scope.signUp = function() {
			$state.go('signuptrainee')
		}

	$scope.signUpTrainee = function (trainee) {
		trainer_id = angular.fromJson(window.localStorage['savedUser']).id
		trainee.trainer_id = trainer_id
		mainFactory.signUpTrainee(trainee, function(data) {
			$scope.trainees = data.data;
			$state.go('trainers')
			$window.location.reload();
		})
	}

})