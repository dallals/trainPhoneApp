app.controller('trainersController', function($scope, $http, mainFactory, $location, $state, $stateParams, $window, $cordovaDevice, $ionicPlatform, Trainer) {

		// console.log(angular.fromJson(window.localStorage['savedUser']))

		var trainer_id = angular.fromJson(window.localStorage['savedUser']).id
		// var trainerTrainee = angular.fromJson(window.localStorage['savedUser'])

		mainFactory.getOneTrainer($stateParams.id, function(data){
			$scope.trainer = data.data
		})

		function getTrainersTrainees() {
			mainFactory.getTrainersTrainees(trainer_id, function(data) {
				$scope.trainees = data.data
			})		
		}
		getTrainersTrainees()

		$scope.reloadTrainees = function(){
			getTrainersTrainees($scope.$broadcast('scroll.refreshComplete'))
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
			clearForm();
			$state.go('signuptrainee')
		}

	$scope.signUpTrainee = function (trainee) {
		trainer_id = angular.fromJson(window.localStorage['savedUser']).id
		trainee.trainer_id = trainer_id
		mainFactory.signUpTrainee(trainee, function(data) {
			if(data.data && data.data.success === false) {
				clearForm();
				$state.go('trainers')
			}
			$scope.trainees = data.data;
			clearForm();
			$state.go('trainers')
		})
	}
		var clearForm = function() {
			$scope.trainee = null;
		}

	// $ionicPlatform.ready(function() {
	// 	$scope.$apply(function() {
	// 		$scope.device = $cordovaDevice.getDevice();
	// 	})
	// })

})