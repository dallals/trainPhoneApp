
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
			var date_array = []

			for(var i = 0; i < data.length; i++) {
				data[i].created_at = Number(data[i].created_at)
				var date = new Date(data[i].created_at).toDateString('YYYY-MM-DD')
				if (date_array.length != 0) {
					var ind = date_array.indexOf(date)
						if (ind != -1) {
							// NOTHING							
						} else {
							// If date is not found - then add it to the array 
							date_array.push(date)
						}
				} else {
					date_array.push(date)
				}				
			}

			var count_d = date_array.length

			var ex_array = []
			var set_array = []
			var ex_type = []
			var ex_traineeId = []
			var ex_exerciseId = []
			var ex_exercisename = []
			var ex_setId = []
			var ex_date = []
			var ex_firstname = []
			var ex_lastname = []

			var wt_array = []
			var rep_array = [] 

			for (var b = 0; b < count_d; b++) {
				ex_array.push(["0"])
				ex_type.push(["0"])
				ex_traineeId.push(["0"])
				ex_exerciseId.push(["0"])
				ex_exercisename.push(["0"])
				ex_firstname.push(["0"])
				ex_lastname.push(["0"])
				ex_setId.push(["0"])
				ex_date.push(["0"])
				set_array.push(["0"])

				wt_array.push([0])
				rep_array.push([0])

			}

			for (var b = 0; b < count_d; b++)  {

				wt_array[b][0] = new Array(1)
				rep_array[b][0] = new Array(1)

				wt_array[b][0][0] = 0
				rep_array[b][0][0] = 0

			}



			for (var n = 0; n < data.length; n++) {
				
				var date = new Date(data[n].created_at).toDateString('YYYY-MM-DD')
				var indx = date_array.indexOf(date)
				var exc = data[n].exercisename
				var indx2 = ex_array[indx].indexOf(exc)

				if (indx2 == -1) {

					if (ex_array[indx][0] == "0") {
						
						ex_array[indx][0] = exc
						ex_type[indx][0] = data[n].exercisetypename
						ex_traineeId[indx][0] = data[n].trainee_id
						ex_exerciseId[indx][0] = data[n].exerciseid
						ex_setId[indx][0] = data[n].setid
						ex_firstname[indx][0] = data[n].first_name
						ex_lastname[indx][0] = data[n].last_name
						ex_exercisename[indx][0] = data[n].exercisename
						ex_date[indx][0] = data[n].created_at
						set_array[indx][0] = 1

						wt_array[indx][0][0] = data[n].weight
						rep_array[indx][0][0] = data[n].rep

					} else {
						
						ex_array[indx].push(exc)
						ex_type[indx].push(data[n].exercisetypename)
						ex_traineeId[indx].push(data[n].trainee_id)
						ex_exerciseId[indx].push(data[n].exerciseid)
						ex_exercisename[indx].push(data[n].exercisename)
						ex_setId[indx].push(data[n].setid)
						ex_firstname[indx].push(data[n].first_name)
						ex_lastname[indx].push(data[n].last_name)
						ex_date[indx].push(data[n].created_at)
						set_array[indx].push(1)

						wt_array[indx].push([data[n].weight])
						rep_array[indx].push([data[n].rep])


					}

				} else {

					set_array[indx][indx2] = set_array[indx][indx2] + 1
					wt_array[indx][indx2].push(data[n].weight)
					rep_array[indx][indx2].push(data[n].rep)

				}

			}

			var allExercises = []
			for (var k = 0; k < date_array.length; k++) {
				// console.log("****")
				// console.log(date_array[k], 'date')
				// console.log(allExercises, "****")
				for (var h = 0; h < ex_array[k].length ; h++ ) {
					// console.log(ex_array[k][h]);
					// console.log(ex_type[k][h]);
					// console.log(ex_traineeId[k][h], 'traineeId');
					allExercises.push({
						created_at: ex_date[k][h],
						setid: ex_setId[k][h],
						exerciseid: ex_exerciseId[k][h],
						trainee_id: ex_traineeId[k][h],
						exercisetypename: ex_type[k][h],
						exercisename: ex_exercisename[k][h]
					})
				}
			}

			$scope.listExcersizes = allExercises 
			$scope.exercises = allExercises
			// $scope.listExcersizes = data
			// $scope.exercises = data
			$scope.count = allExercises.length
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
			case "sixmonth":
				var currentDate = Date.now()
				var sixMonthAgo = new Date();
				sixMonthAgo.setDate(sixMonthAgo.getDate() - 180);
				sixMonthAgo = Date.parse(sixMonthAgo)
				var thisSixMonthExercises = [];
				for(var i = 0; i < allExercises.length; i++) {
					 allExercises[i].created_at = Number(allExercises[i].created_at)
					 if(allExercises[i].created_at > sixMonthAgo) {
					 		thisSixMonthExercises.push(allExercises[i])
					 } 
				}
				$scope.exercises = thisSixMonthExercises;
				$scope.count = thisSixMonthExercises.length
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
				console.log(id)
				var dbData = data
				var count = data.length
				var date_array = []
				var date_array_count = []
				//console.log(count)

				// var wt_array = new Array(count);
				// for (var ii = 0; ii < dbData.length; ii++) {
  		// 		wt_array[ii] = new Array(6);
				// }

				for(var x = 0; x < dbData.length; x++) {
					dbData[x].created_at = Number(dbData[x].created_at)
					dbData[x].created_at = new Date(dbData[x].created_at).toDateString('YYYY-MM-DD')
					
					if (date_array.length > 0 ) {
						var ind = date_array.indexOf(dbData[x].created_at)
						if (ind != -1) {
							
							date_array_count[ind] = date_array_count[ind] + 1
							//wt_array[ind][date_array_count[ind]] = dbData[x].weight 
						
						} else {
							// If date is not found - then add it to the array 
							date_array.push(dbData[x].created_at)
							date_array_count[date_array.length -1] = 1 
							//wt_array[date_array.length -1][0] = dbData[x].weight
						}
					} else {
						date_array.push(dbData[x].created_at)
						date_array_count[0] = 1 
					}
					
					}
					//console.log(date_array_count)
				console.log(date_array)


				$scope.grapherData = dataGraph
				//console.log($scope.grapherData, 'new object')
				$scope.chart()
			})
		}		
	}	


	// for(var xx = 0; xx < date_array.length; xx++ ) {

	// 	if (date_array_count[xx] == 1) {
	// 					dataGraph.push({
	// 					date: date_array[xx],
	// 					ay: 1,
	// 					by: 0,
	// 					cy: 0,
	// 					dy: 0,
	// 					ey: 0,
	// 					fy: 0,
	// 					aVaule: 1,
	// 					bVaule: 0,
	// 					cVaule: 0,
	// 					dVaule: 0,
	// 					eVaule: 0,
	// 					fVaule: 0
	// 				})

	// 	} else if (date_array_count[xx] == 2) {
	// 		dataGraph.push({
	// 					date: date_array[xx],
	// 					ay: 1,
	// 					by: 0,
	// 					cy: 0,
	// 					dy: 0,
	// 					ey: 0,
	// 					fy: 0,
	// 					aVaule: 1,
	// 					bVaule: 0,
	// 					cVaule: 0,
	// 					dVaule: 0,
	// 					eVaule: 0,
	// 					fVaule: 0
	// 				})

	// 	} else if (date_array_count[xx] == 3) {

	// 	} else if (date_array_count[xx] == 4) {

	// 	} else if (date_array_count[xx] == 5) {

	// 	} else 

	// 	}


	// }

					// dataGraph.push({
					// 	date: dbData[x].created_at,
					// 	ay: "helo" + String(x),
					// 	by: dbDataw,
					// 	cy: "helo" + String(x),
					// 	dy: 100,
					// 	ey: 0,
					// 	fy: 0,
					// 	aVaule: 0,
					// 	bVaule: 0,
					// 	cVaule: 0,
					// 	dVaule: 0,
					// 	eVaule: 0,
					// 	fVaule: 0
					// })
			
	$scope.chart = function () {
			var chartData2 = $scope.grapherData
			//console.log(chartData2, 'new data')
			// var seconds = ((chartData[0].year % 60000) / 1000).toFixed(2).toString();
			loadChart = function() {
					// chartData2 = angular.toJson(chartData2)
					// console.log(chartData2, 'json')
						var chart = AmCharts.makeChart( "chartdiv", {
					    "type": "xy",
					    "theme": "light",
					    "marginRight": 80,
					    "dataDateFormat": "YYYY-MM-DD",
					    "startDuration": 1.5,
					    "trendLines": [],
					    "balloon": {
					        "adjustBorderColor": false,
					        "shadowAlpha": 0,
					        "fixedPosition":true
					    },
					    "graphs": [{
					        "balloonText": "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
					        "bullet": "round",
					        "id": "AmGraph-1",
					        "lineAlpha": 0,
					        "lineColor": "#fcd202",
					        "fillAlphas": 0,
					        "valueField": "aValue",
					        "xField": "date",
					        "yField": "ay"
					    }, {
					        "balloonText": "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
					        "bullet": "round",
					        "id": "AmGraph-2",
					        "lineAlpha": 0,
					        "lineColor": "#fcd202",
					        "fillAlphas": 0,
					        "valueField": "bValue",
					        "xField": "date",
					        "yField": "by"
					    }, {
					        "balloonText": "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
					        "bullet": "round",
					        "id": "AmGraph-3",
					        "lineAlpha": 0,
					        "lineColor": "#fcd202",
					        "fillAlphas": 0,
					        "valueField": "cValue",
					        "xField": "date",
					        "yField": "cy"
					    }, {
					        "balloonText": "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
					        "bullet": "round",
					        "id": "AmGraph-4",
					        "lineAlpha": 0,
					        "lineColor": "#fcd202",
					        "fillAlphas": 0,
					        "valueField": "dValue",
					        "xField": "date",
					        "yField": "dy"
					    }, {
					        "balloonText": "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
					        "bullet": "round",
					        "id": "AmGraph-5",
					        "lineAlpha": 0,
					        "lineColor": "#fcd202",
					        "fillAlphas": 0,
					        "valueField": "eValue",
					        "xField": "date",
					        "yField": "ey"
					    }, {
					        "balloonText": "<div style='margin:5px;'><b>[[x]]</b><br>y:<b>[[y]]</b><br>value:<b>[[value]]</b></div>",
					        "bullet": "round",
					        "id": "AmGraph-6",
					        "lineAlpha": 0,
					        "lineColor": "#fcd202",
					        "fillAlphas": 0,
					        "valueField": "fValue",
					        "xField": "date",
					        "yField": "fy"
					    }],
					    "valueAxes": [{
					        "id": "ValueAxis-1",
					        "axisAlpha": 0
					    }, {
					        "id": "ValueAxis-2",
					        "axisAlpha": 0,
					        "position": "bottom",
					        "type": "date",
					        "minimumDate": new Date(2014, 11, 31),
					        "maximumDate": new Date(2015, 0, 13)
					    }],
					    "allLabels": [],
					    "titles": [],
					    "dataProvider": [{
					        "date": "2015-01-01",
					        "ay": 6.5,
					        "by": 2.2,
					        "cy": 4,
					        "dy": 0,
					        "ey": 0,
					        "fy": 0,
					        "aValue": 1,
					        "bValue": 1,
					        "cValue": 1,
					        "dValue": 0,
					        "eValue": 0,
					        "fValue": 0
					        
					    }],

					    "export": {
					        "enabled": true
					    },

					    "chartScrollbar": {
					        "offset": 15,
					        "scrollbarHeight": 5
					    },

					    "chartCursor":{
					       "pan":true,
					       "cursorAlpha":0,
					       "valueLineAlpha":0
					    }
				});
			}
			loadChart()
	}
})