
app.controller('traineesController', function($scope, mainFactory, $stateParams, $state, $window, $ionicPopup, Trainer) {


	var trainer = angular.fromJson(window.localStorage['savedUser'])
	$scope.trainerId = angular.fromJson(window.localStorage['savedUser']).id
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
			// console.log(data)
			$scope.trainerexercises = data
		})

	$scope.reloadTraineesExercise = function(){
		mainFactory.getAllTraineeExercises($stateParams.id, function(data){
			$scope.listExcersizes = data 
			$scope.exercises = data
			$scope.count = data.length
			$scope.$broadcast('scroll.refreshComplete');
		})
	}
	$scope.reloadTraineesExercise()
	// mainFactory.getAllTraineeExercises($stateParams.id, function(data){
	// 	$scope.listExcersizes = data 
	// 	$scope.exercises = data
	// 	$scope.count = data.length
	// })

	$scope.filterByDateWeek = function () {
		// $scope.reloadTraineesExercise()
		var allExercises = $scope.exercises
		var currentDate = Date.now()
		var oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
		var covertDate = Number(allExercises[0].created_at)
		var thisWeekExercises = [];
		for(var i = 0; i < allExercises.length; i++) {
			 allExercises[i].created_at = Number(allExercises[i].created_at)
			 if(allExercises[i].created_at > oneWeekAgo) {
			 		thisWeekExercises.push(allExercises[i])
			 } 
		}
		$scope.exercises = thisWeekExercises;
		$scope.count = thisWeekExercises.length
	}

	$scope.filterByDateMonth = function () {
		// $scope.reloadTraineesExercise();
		var allExercises = $scope.exercises
		var currentDate = Date.now()
		var oneMonthAgo = new Date();
		oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
		oneMonthAgo = Date.parse(oneMonthAgo)
		var covertDate = Number(allExercises[0].created_at)
		var thisMonthExercises = [];
		for(var i = 0; i < allExercises.length; i++) {
			 allExercises[i].created_at = Number(allExercises[i].created_at)
			 if(allExercises[i].created_at > oneMonthAgo) {
			 		thisMonthExercises.push(allExercises[i])
			 } 
		}
		$scope.exercises = thisMonthExercises;
		$scope.count = thisMonthExercises.length
	}

	$scope.filterByDateThreeMonths = function () {
		// $scope.reloadTraineesExercise();

		var allExercises = $scope.exercises
		var currentDate = Date.now()
		var threeMonthAgo = new Date();
		threeMonthAgo.setDate(threeMonthAgo.getDate() - 90);
		threeMonthAgo = Date.parse(threeMonthAgo)
		var covertDate = Number(allExercises[0].created_at)
		var thisThreeMonthExercises = [];
		for(var i = 0; i < allExercises.length; i++) {
			 allExercises[i].created_at = Number(allExercises[i].created_at)
			 if(allExercises[i].created_at > threeMonthAgo) {
			 		thisThreeMonthExercises.push(allExercises[i])
			 } 
		}
		$scope.exercises = thisThreeMonthExercises;
		$scope.count = thisThreeMonthExercises.length
	}

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


	$scope.clientButton = function(){
		$state.go('trainers')
	}

	$scope.deleteExercise = function(exercise) {
		mainFactory.deleteExercise(exercise, function(data){
			$scope.exercises = data
		})
	}

})