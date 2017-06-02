
app.controller('traineesController', function($scope, mainFactory, $stateParams, $state, $window, $ionicPopup, Trainer) {


	var trainer = angular.fromJson(window.localStorage['savedUser'])

	mainFactory.getOneTrainee($stateParams.id, function(data){
		// var trainerTrainee = angular.fromJson(window.localStorage['savedUser'])
		// if(Trainer.compareTrainee(trainerTrainee, data.data[0]) === false) {
		// 	console.log('is False')
		// 	$state.go('trainers', {id: trainerTrainee.id})
		// } else {
			$scope.trainee = data.data[0]
		// }	
	});

		mainFactory.getAllYourExercises(trainer.id, function(data){
			console.log(data)
			$scope.trainerexercises = data
		})


	mainFactory.getAllTraineeExercises($stateParams.id, function(data){
		$scope.listExcersizes = data 
		$scope.exercises = data
		$scope.count = data.length
		console.log($scope.count)
	})


	$scope.addExercise = function(exercise) {
		exercise.trainer_id = angular.fromJson(window.localStorage['savedUser']).id
		mainFactory.addExercise(exercise, $stateParams.id, function(data){
			$scope.exercises = data
			$state.go('trainee', {id: $scope.trainee.id})
		})
	}

	var clearForm = function() {
		$scope.exercise = null;
	}

	$scope.showExercise = function(id) {
		$state.go('exercise', {id: id})
	}

	$scope.signUpTrainee = function (trainee) {
		trainer_id = angular.fromJson(window.localStorage['savedUser']).id
		trainee.trainer_id = trainer_id
		mainFactory.signUpTrainee(trainee, function(data) {
			$scope.trainees = data.data;
			$state.go('trainers')
		})
	}

	$scope.addWorkOut = function(id) {
		$state.go('addExercise', {id: id})
	};

	$scope.reloadTraineesExercise = function(){
		mainFactory.getAllTraineeExercises($stateParams.id, function(data){
			$scope.listExcersizes = data 
			$scope.exercises = data
			$scope.$broadcast('scroll.refreshComplete');
		})
	}

	$scope.clientButton = function(){
		$state.go('trainers')
	}

	$scope.deleteExercise = function(exercise) {
		console.log(exercise)
		mainFactory.deleteExercise(exercise, function(data){
			$scope.exercises = data
		})
	}

})