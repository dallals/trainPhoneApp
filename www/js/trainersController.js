app.controller('trainersController', function($scope, $http, mainFactory, $location, $state, $stateParams, $window, $cordovaDevice, $ionicPlatform, Trainer) {


		var selectedTrianee = false
		$scope.selectedTraineeName = "Select A Client"
		// console.log(angular.fromJson(window.localStorage['savedUser']))
		$scope.checkTrainer = window.localStorage.getItem('trainerLoggedIn') || undefined

		$scope.trainer = angular.fromJson(window.localStorage['savedUser'])
		var trainer_id = $scope.trainer.id

		mainFactory.getOneTrainer($stateParams.id, function(data){
			$scope.trainer = data.data
		});

		mainFactory.getAllYourExercises(trainer_id, function(data){
			$scope.exercises = data
		});

		$scope.reloadTrainersExercise = function() {
			mainFactory.getAllYourExercises($stateParams.id, function(data){
				$scope.exercises = data
				$scope.$broadcast('scroll.refreshComplete')
			})
		};

		$scope.deleteTrainerExercise = function(id) {
			mainFactory.deleteTrainerExercise(id, function(data) {
			})
			$scope.reloadTrainersExercise()
		};

		function getTrainersTrainees() {
			mainFactory.getTrainersTrainees(trainer_id, function(data) {
				$scope.trainees = data.data
			})		
		};
		getTrainersTrainees()

		$scope.reloadTrainees = function(){
			selectedTrianee = false
			$scope.selectedTraineeName = "Select A Client"
			getTrainersTrainees($scope.$broadcast('scroll.refreshComplete'))
		};

		$scope.showTraineeSelect = function(trainee) {
			$state.go('trainee', {id: trainee})
		}

		$scope.showTrainee = function(trainee) {
			$state.go('trainee', {id: trainee.id})
		};


		var clearForm = function() {
			$scope.trainee = null;
		};

		$scope.removeTrainee = function(trainee) {
			console.log(trainee)
			mainFactory.removeTrainee(trainee, function(data) {
				$scope.trainees = data.data
			})
		};

		$scope.signUp = function() {
			clearForm();
			$state.go('signuptrainee')
		};

		$scope.clientButton = function(){
			$state.go('trainers')
		};

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
	};

	$scope.addTrainerExercise = function(exercise) {
		exercise.trainer_id = trainer_id
		mainFactory.addTrainerExercise(exercise, function(data) {
			$scope.exercise = data
		})
		$state.go('showtrainersexercises', {id: exercise.trainer_id})
	};

	var clearForm = function() {
		$scope.trainee = null;
	};

	$scope.filterTrainee = function(trainee) {
		if(trainee == 'Select Client'){
			selectedTrianee = false
			$scope.selectedTraineeName = "Select A Client"
		} else {
			var selectTrainee = angular.fromJson(trainee)
			if(selectTrainee.id !== undefined) {
				selectedTrianee = true
				$scope.selectTraineeId = selectTrainee.id
				$scope.selectedTraineeName = selectTrainee.first_name + ' ' + selectTrainee.last_name
			}
		}
	};
	
	$scope.buttonDisableLogger = function () {
		if(selectedTrianee !== true) {
			return true;
		} else {
			return false;
		}
	}

	$scope.disableButton = function () {
		selectedTrianee = false
		$scope.selectedTraineeName = "Select A Client"
	}

	$scope.addWorkOutLogger = function(id) {
		$state.go('addExercise', {id: id})
	};

	// $ionicPlatform.ready(function() {
	// 	$scope.$apply(function() {
	// 		$scope.device = $cordovaDevice.getDevice();
	// 	})
	// })

})