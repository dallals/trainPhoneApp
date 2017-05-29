
app.controller('traineesController', function($scope, mainFactory, $cookies, $stateParams, $state, $window, $ionicPopup) {

	mainFactory.getOneTrainee($stateParams.id, function(data){
		$scope.trainee = data.data[0]
		// if($scope.trainee.trainer != $cookies.getObject('userCookie').id){
		// 	$location.path('/trainers/'+$cookies.getObject('userCookie').id)
		// }
	});

	// mainFactory.getTypes(function(data){
	// 	$scope.types = data.data
	// })

	mainFactory.getAllTraineeExercises($stateParams.id, function(data){
		$scope.listExcersizes = data 
		$scope.exercises = data
	})


	$scope.addExercise = function(exercise) {
		exercise.trainer_id = angular.fromJson(window.localStorage['savedUser']).id
		mainFactory.addExercise(exercise, $stateParams.id, function(data){
			$scope.exercises = data
			console.log($scope.exercises)
			$state.go('trainee', {id: $scope.trainee.id})
		})
		// mainFactory.getAllTraineeExercises($stateParams.id, function(data){
		// 	$scope.listExcersize = data 
		// 	$state.go('trainee', {id: $scope.trainee.id})
		// 	$scope.exercises = data
		// 	// $window.location.reload();
		// })
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