app.controller('trainersController', function($scope, $http, mainFactory, $location, $state, $stateParams, $window, $cordovaDevice, $ionicPlatform, Trainer) {

		// console.log(angular.fromJson(window.localStorage['savedUser']))
		$scope.checkTrainer = window.localStorage.getItem('trainerLoggedIn') || undefined

		$scope.trainer = angular.fromJson(window.localStorage['savedUser'])
		var trainer_id = $scope.trainer.id

		mainFactory.getOneTrainer($stateParams.id, function(data){
			$scope.trainer = data.data
		});

		mainFactory.getAllYourExercises($stateParams.id, function(data){
			console.log(data)
			$scope.exercises = data
		});

		$scope.reloadTrainersExercise = function() {
			mainFactory.getAllYourExercises($stateParams.id, function(data){
				$scope.exercises = data
				$scope.$broadcast('scroll.refreshComplete')
			})
		};

		function getTrainersTrainees() {
			mainFactory.getTrainersTrainees(trainer_id, function(data) {
				$scope.trainees = data.data
			})		
		};
		getTrainersTrainees()

		$scope.reloadTrainees = function(){
			getTrainersTrainees($scope.$broadcast('scroll.refreshComplete'))
		};

		$scope.showTraineeSelect = function(trainee) {
			console.log(typeof trainee)
			$state.go('trainee', {id: trainee})
		}

		$scope.showTrainee = function(trainee) {
			$state.go('trainee', {id: trainee.id})
		};


		var clearForm = function() {
			$scope.trainee = null;
		};

		$scope.removeTrainee = function(trainee) {
			mainFactory.removeTrainee(trainee, function(data) {
				$scope.trainees = data.data
			})
		};

		$scope.signUp = function() {
			clearForm();
			$state.go('signuptrainee')
		};

		$scope.clientButton = function(){
			console.log('getting here')
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
		console.log(exercise)
		mainFactory.addTrainerExercise(exercise, function(data) {
			$scope.exercise = data
		})
		$state.go('showtrainersexercises', {id: exercise.trainer_id})
	};

	var clearForm = function() {
		$scope.trainee = null;
	};

	// $ionicPlatform.ready(function() {
	// 	$scope.$apply(function() {
	// 		$scope.device = $cordovaDevice.getDevice();
	// 	})
	// })

})