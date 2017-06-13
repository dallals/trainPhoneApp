
app.controller('traineesController', function($scope, mainFactory, $stateParams, $state, $window, $ionicPopup, Trainer, $http, $rootScope) {


	var trainer = angular.fromJson(window.localStorage['savedUser'])
	$scope.trainerId = angular.fromJson(window.localStorage['savedUser']).id

	mainFactory.getOneTrainee($stateParams.id, function(data){
		var trainerTrainee = angular.fromJson(window.localStorage['savedUser'])
		if(Trainer.compareTrainee(trainerTrainee, data.data[0]) === false) {
			$state.go('trainers', {id: trainerTrainee.id})
		} else {
			$scope.trainee = data.data[0]
		}	
	});

		mainFactory.getAllYourExercises(trainer.id, function(data){
			$scope.trainerexercises = data
		})


	$scope.reloadTraineesExercise = function(){
		mainFactory.getAllTraineeExercises($stateParams.id, function(data){
			$scope.listExcersizes = data 
			$scope.exercises = data
			$scope.count = data.length
			$scope.$broadcast('scroll.refreshComplete');
			$scope.workoutTimeFrame = ''
		})
	}
	$scope.reloadTraineesExercise()



	$scope.switchDate = function (selected) {
		var allExercises = $scope.listExcersizes
		key = selected;
		switch (key) {

			case 'week': 
				var currentDate = Date.now()
				var oneWeekAgo = new Date();
				oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
				
				var thisWeekExercises = [];
				for(var i = 0; i < allExercises.length; i++) {
					 allExercises[i].created_at = Number(allExercises[i].created_at)
					 if(allExercises[i].created_at > oneWeekAgo) {
					 		thisWeekExercises.push(allExercises[i])
					 } 
				}
				$scope.exercises = thisWeekExercises;
				$scope.count = thisWeekExercises.length
				$scope.workoutTimeFrame = 'Workouts for last 7 days'
				$scope.isActive = function(cssclass) {
					if(cssclass == 'week'){
						return 'active'
					} else {
						return 'notActive'
					}
				}			
				break;
			case 'month':	
				var currentDate = Date.now()
				var oneMonthAgo = new Date();
				oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
				oneMonthAgo = Date.parse(oneMonthAgo)
				
				var thisMonthExercises = [];
				for(var i = 0; i < allExercises.length; i++) {
					 allExercises[i].created_at = Number(allExercises[i].created_at)
					 if(allExercises[i].created_at > oneMonthAgo) {
					 		thisMonthExercises.push(allExercises[i])
					 } 
				}
				$scope.exercises = thisMonthExercises;
				$scope.count = thisMonthExercises.length
				$scope.workoutTimeFrame = 'Workouts for last 30 days'
				$scope.isActive = function(cssclass) {
					if(cssclass == 'month'){
						return 'active'
					} else {
						return 'notActive'
					}
				}					
				break;
			case "threemonth":
				var currentDate = Date.now()
				var threeMonthAgo = new Date();
				threeMonthAgo.setDate(threeMonthAgo.getDate() - 180);
				threeMonthAgo = Date.parse(threeMonthAgo)
				var thisThreeMonthExercises = [];
				for(var i = 0; i < allExercises.length; i++) {
					 allExercises[i].created_at = Number(allExercises[i].created_at)
					 if(allExercises[i].created_at > threeMonthAgo) {
					 		thisThreeMonthExercises.push(allExercises[i])
					 } 
				}
				$scope.exercises = thisThreeMonthExercises;
				$scope.count = thisThreeMonthExercises.length
				$scope.workoutTimeFrame = 'Workouts for last 180 days'
				$scope.isActive = function(cssclass) {
					if(cssclass == '6month'){
						return 'active'
					} else {
						return 'notActive'
					}
				}	
				break;
			case "all":
				$scope.isActive = function(cssclass) {
					if(cssclass == 'all'){
						return 'active'
					} else {
						return 'notActive'
					}
				}
				$scope.exercises = $scope.listExcersizes
				$scope.count = $scope.exercises.length
				break 
		}
	}

	$scope.getExerciseByName = function(name) {
		var apiUrl = "https://vast-depths-36442.herokuapp.com"
		var apiLocal = "http://localhost:8000"
		$scope.exercises = $scope.listExcersizes
		var filteredExercises = [];
		for(var i = 0; i < $scope.exercises.length; i++) {
			if($scope.exercises[i].exercisename === name ){
				filteredExercises.push($scope.exercises[i])
			}
		}
		$scope.exercises = filteredExercises
		$scope.count = $scope.exercises.length

		var dataGraph = [];
		for(var i = 0; i < $scope.exercises.length; i++) {
			var id = $scope.exercises[i].exerciseid
			$http.get(apiUrl+'/trainees/setandexercises/'+id+'.json').then(function(data) {
				var dbData = data.data
				for(var x = 0; x < dbData.length; x++) {
					dataGraph.push(dbData[x])
					$rootScope.grapherData = dataGraph
					console.log($rootScope.grapherData, 'rootscope')
					window.localStorage['graphData'] = angular.toJson(dataGraph)
					// console.log(window.localStorage.getItem('graphData'))
				}
			})

		}
	}	

	$scope.addExercise = function(exercise) {
		exercise.trainer_id = angular.fromJson(window.localStorage['savedUser']).id
		mainFactory.addExercise(exercise, $stateParams.id, function(data){
			$scope.exercises = data
			$state.go('trainee', {id: $scope.trainee.id})
		})
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