
app.controller('traineesController', function($scope, mainFactory, $cookies, $stateParams, $state) {

	mainFactory.getOneTrainee($stateParams.id, function(data){
		$scope.trainee = data.data[0]
		// if($scope.trainee.trainer != $cookies.getObject('userCookie').id){
		// 	$location.path('/trainers/'+$cookies.getObject('userCookie').id)
		// }
	})

	mainFactory.getAllTraineeExercises($stateParams.id, function(data){
		$scope.listExcersizes = data 
		for(var i = 0; i < data.length; i++){
			var date = data[i].created_at
			for(var x = 1; x < data.length; x++){
				var date2 = data[x].created_at
				if(date === date2){
					data.splice(x, 1)
				}
			}
		}
		console.log(data)
		$scope.exercises = data
	})

	$scope.addExercise = function(exercise) {
		exercise.trainer_id = $cookies.getObject('userCookie').id
		mainFactory.addExercise(exercise, $stateParams.id, function(data){
		})
		mainFactory.getAllTraineeExercises($stateParams.id, function(data){
			$scope.listExcersize = data 
			for(var i = 0; i < data.length; i++){
				var date = data[i].created_at
				for(var x = 1; x < data.length; x++){
					var date2 = data[x].created_at
					if(date === date2){
						data.splice(x, 1)
					}
				}
			}
			$scope.exercises = data
			clearForm();
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

})