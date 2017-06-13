
app.controller('traineesController', function($scope, mainFactory, $stateParams, $state, $window, $ionicPopup, Trainer, $http) {


	var trainer = angular.fromJson(window.localStorage['savedUser'])
	$scope.trainerId = angular.fromJson(window.localStorage['savedUser']).id
	// $rootScope.grapherData = ''

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
				// $rootScope.grapherData = ''
				$scope.count = $scope.exercises.length
				break 
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

	// $scope.grapherData = [];
	// var chartData2
	// $scope.$watch('grapherData', function(newValue, oldValue, scope) {
	// 	$scope.grapherData = scope.grapherData;
	// 	console.log($scope.grapherData, 'watcher')
	// 	// chartData2 = $scope.grapherData
	// })

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
				// console.log(dbData, 'before sort')
				// dbData.sort(function(a, b) {
				// 	return a.created_at - b.created_at
				// })
				// console.log(dbData, 'after sort')

			mainFactory.GetSetAndExercise(id, function(data) {
				var dbData = data
				for(var x = 0; x < dbData.length; x++) {
					dbData[x].created_at = Number(dbData[x].created_at)
					dbData[x].created_at = new Date(dbData[x].created_at).toDateString()
					dbData[x].created_at = dbData[x].setname + ' ' + dbData[x].created_at
					dataGraph.push(dbData[x])
				}
				$scope.grapherData = dataGraph
				$scope.chart()
			})
		}		
	}	

			
	$scope.chart = function () {
			var chartData2 = $scope.grapherData
			// var seconds = ((chartData[0].year % 60000) / 1000).toFixed(2).toString();
			loadChart = function() {
						var chart = AmCharts.makeChart( "chartdiv", {
						  "type": "serial",
						  "theme": "light",
						  "marginRight": 40,
						  "marginLeft": 40,
						  "autoMarginOffset": 20,
						  "dataDateFormat": "YYYY-MM-DD",
						  "valueAxes": [ {
						    "id": "v1",
						    "axisAlpha": 0,
						    "position": "left",
						    "ignoreAxisWidth": true
						  } ],
						  "balloon": {
						    "borderThickness": 1,
						    "shadowAlpha": 0
						  },
						  "graphs": [ {
						    "id": "g1",
						    "balloon": {
						      "drop": false,
						      "adjustBorderColor": true,
						      "color": "#ffffff",
						      "type": "smoothedLine"
						    },
						    "fillAlphas": 0.2,
						    "bullet": "round",
						    "bulletBorderAlpha": 1,
						    "bulletColor": "#FFFFFF",
						    "bulletSize": 5,
						    "hideBulletsCount": 50,
						    "lineThickness": 2,
						    "title": "red line",
						    "useLineColorForBulletBorder": true,
						    "valueField": "weight",
						    "balloonText": "<span style='font-size:18px;'>[[weight]]</span>"
						  } ],
						  "chartCursor": {
						    "valueLineEnabled": true,
						    "valueLineBalloonEnabled": true,
						    "cursorAlpha": 0,
						    "zoomable": false,
						    "valueZoomable": true,
						    "valueLineAlpha": 0.5
						  },
						  "valueScrollbar": {
						    "autoGridCount": true,
						    "color": "#000000",
						    "scrollbarHeight": 50
						  },
						  "categoryField": "created_at",
						  "categoryAxis": {
								"autoGridCount": false,
							 	"gridCount": 10,
							  "gridPosition": "start",
						    "labelRotation": 45
						  },
						  "export": {
						    "enabled": true
						  },
						  "dataProvider": chartData2
						} );
									}
			loadChart()
	}
})