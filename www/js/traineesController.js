
app.controller('traineesController', function($scope, mainFactory, $stateParams, $state, $window, $ionicPopup, Trainer, $http) {


	var trainer = angular.fromJson(window.localStorage['savedUser'])
	$scope.trainerId = angular.fromJson(window.localStorage['savedUser']).id
	// $rootScope.grapherData = ''
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
			var c_array = []
			var rep_array = []
			var selectExercises = []
			var graphData = []


			var date_range_min = ""
			var date_range_max = ""
			$scope.hideGraph = false

	mainFactory.getOneTrainee($stateParams.id, function(data){
		var trainerTrainee = angular.fromJson(window.localStorage['savedUser'])
		if(Trainer.compareTrainee(trainerTrainee, data.data[0]) === false) {
			$state.go('trainers', {id: trainerTrainee.id})
		} else {
			$scope.trainee = data.data[0]
		}	
	});


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
				c_array.push([0])
			}

			for (var b = 0; b < count_d; b++)  {

				wt_array[b][0] = new Array(1)
				rep_array[b][0] = new Array(1)
				c_array[b][0] = new Array(1)

				wt_array[b][0][0] = 0
				rep_array[b][0][0] = 0
				c_array[b][0][0] = 0

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
						rep_array[indx][0][0] = data[n].reps
						c_array[indx][0][0] = data[n].created_at

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
						// ex_reps[indx].push(data[n].reps)
						set_array[indx].push(1)

						wt_array[indx].push([data[n].weight])
						rep_array[indx].push([data[n].reps])
						c_array[indx].push([data[n].created_at])

					}

				} else {

					set_array[indx][indx2] = set_array[indx][indx2] + 1
					wt_array[indx][indx2].push(data[n].weight)
					rep_array[indx][indx2].push(data[n].reps)
					c_array[indx][indx2].push(data[n].created_at)


				}
			}

			var allExercises = []
			for (var j=0; j < date_array.length; j++) {		
				for (var m=0; m < ex_array[j].length ; m ++) {
						allExercises.push({
						created_at: ex_date[j][m],
						exerciseid: ex_exerciseId[j][m],
						trainee_id: ex_traineeId[j][m],
						exercisetypename: ex_type[j][m],
						exercisename: ex_exercisename[j][m],	
						reps: (rep_array[j][m]).toString(),
						wts: (wt_array[j][m]).toString(),
						dates: (c_array[j][m]).toString()
					})	
				}
			} 
			$scope.allData = allExercises

			$scope.listExcersizes = allExercises 
			$scope.exercises = allExercises
			selectExercises = allExercises
			$scope.count = allExercises.length
			$scope.$broadcast('scroll.refreshComplete');
			$scope.workoutTimeFrame = ''
			var exerciseName = [];
			var ind_x = -1
			for(var i = 0; i < $scope.exercises.length; i++) {  //drop downlist
				if (i != 0 ) {
					ind_x = exerciseName.map(function(e) { return e.name; }).indexOf($scope.exercises[i].exercisename);
				}
				if (ind_x == -1) {
					exerciseName.push({
						name: $scope.exercises[i].exercisename
					})
				}		
			}
			$scope.trainerexercises = exerciseName
			$scope.dateArray = date_array
			
		})

	}
	$scope.reloadTraineesExercise()

	$scope.switchDate = function (selected) {
		$scope.hideGraph = false
		var selected_date_array = []
		var selected_date_array_indx = []
		var one_day_ms = 24*60*60*1000
		var num_days = 1

		var allExercises = $scope.listExcersizes
		key = selected;
		switch (key) {

			case 'week': 
				var currentDate = Date.now()
				num_days = 7
				//one_week in ms
				var time_delta = one_day_ms*num_days
							
				var end_date = currentDate - time_delta
				var thisWeekExercises = [];
				var dates = $scope.dateArray

				for (var k = 0; k <$scope.dateArray.length; k++) {
					// console.log($scope.dateArray, 'getting to week')
					if (Date.parse($scope.dateArray[k]) > end_date) {
						selected_date_array.push($scope.dateArray[k])
						selected_date_array_indx.push(k)
					}
				}
				
				for (var j=0; j < selected_date_array.length; j++) {		
					for (var m=0; m < ex_array[j].length ; m ++) {
							thisWeekExercises.push({
							created_at: ex_date[j][m],
							exerciseid: ex_exerciseId[j][m],
							trainee_id: ex_traineeId[j][m],
							exercisetypename: ex_type[j][m],
							exercisename: ex_exercisename[j][m],	
							reps: (rep_array[j][m]).toString(),
							wts: (wt_array[j][m]).toString(),
							dates: (c_array[j][m]).toString()
						})	
					}
				} 
				selectExercises = thisWeekExercises

				$scope.exercises = thisWeekExercises;
				var exerciseName = [];
				var ind_x = -1
				for(var i = 0; i < $scope.exercises.length; i++) {  //drop downlist
					if (i != 0 ) {
						ind_x = exerciseName.map(function(e) { return e.name; }).indexOf($scope.exercises[i].exercisename);
					}
					if (ind_x == -1) {
						exerciseName.push({
							name: $scope.exercises[i].exercisename
						})
					}		
				}
				$scope.trainerexercises = exerciseName
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
				// var oneMonthAgo = new Date();
				// oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
				// oneMonthAgo = Date.parse(oneMonthAgo)
				num_days = 30
				var time_delta = one_day_ms*num_days
				var end_date = currentDate - time_delta
				
				var thisMonthExercises = [];

				for(var k = 0; k < $scope.dateArray.length; k++) {
					if(Date.parse($scope.dateArray[k]) > end_date) {
						selected_date_array.push($scope.dateArray[k])
						selected_date_array_indx.push(k)
					}
					console.log(selected_date_array_indx)
				}

				for (var j=0; j < selected_date_array.length; j++) {
					
					for (var m=0; m < ex_array[j].length ; m ++) {
							
							thisMonthExercises.push({
							created_at: ex_date[j][m],
							exerciseid: ex_exerciseId[j][m],
							trainee_id: ex_traineeId[j][m],
							exercisetypename: ex_type[j][m],
							exercisename: ex_exercisename[j][m],	
							reps: (rep_array[j][m]).toString(),
							wts: (wt_array[j][m]).toString(),
							dates: (c_array[j][m]).toString()
						})	
					}
				}
				selectExercises = thisMonthExercises;
				console.log(selectExercises, 'selectExercises')


				$scope.exercises = thisMonthExercises;
				var exerciseName = [];
				var ind_x = -1
				for(var i = 0; i < $scope.exercises.length; i++) {  //drop downlist
					if (i != 0 ) {
						ind_x = exerciseName.map(function(e) { return e.name; }).indexOf($scope.exercises[i].exercisename);
					}
					if (ind_x == -1) {
						exerciseName.push({
							name: $scope.exercises[i].exercisename
						})
					}		
				}
				$scope.trainerexercises = exerciseName
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
				num_days = 180
				var time_delta = one_day_ms*num_days
				var end_date = currentDate - time_delta
				var thisSixMonthExercises = [];

				for(var k = 0; k < $scope.dateArray.length; k++) {
					if(Date.parse($scope.dateArray[k]) > end_date) {
						selected_date_array.push($scope.dateArray[k])
						selected_date_array_indx.push(k)
					}
					console.log(selected_date_array_indx)
				};

				for (var j=0; j < selected_date_array.length; j++) {
					
					for (var m=0; m < ex_array[j].length ; m ++) {
							
						thisSixMonthExercises.push({
							created_at: ex_date[j][m],
							exerciseid: ex_exerciseId[j][m],
							trainee_id: ex_traineeId[j][m],
							exercisetypename: ex_type[j][m],
							exercisename: ex_exercisename[j][m],	
							reps: (rep_array[j][m]).toString(),
							wts: (wt_array[j][m]).toString(),
							dates: (c_array[j][m]).toString()
							// reps: ex_reps[k][h]
						})	
					}
				}
				selectExercises = thisSixMonthExercises;
				console.log(selectExercises, 'selectExercises')
				var exerciseName = [];
				var exerciseName = [];
				var ind_x = -1
				for(var i = 0; i < $scope.exercises.length; i++) {  //drop downlist
					if (i != 0 ) {
						ind_x = exerciseName.map(function(e) { return e.name; }).indexOf($scope.exercises[i].exercisename);
					}
					if (ind_x == -1) {
						exerciseName.push({
							name: $scope.exercises[i].exercisename
						})
					}		
				}
				$scope.trainerexercises = exerciseName

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
				var exerciseName = [];
				var ind_x = -1
				for(var i = 0; i < $scope.exercises.length; i++) {  //drop downlist
					if (i != 0 ) {
						ind_x = exerciseName.map(function(e) { return e.name; }).indexOf($scope.exercises[i].exercisename);
					}
					if (ind_x == -1) {
						exerciseName.push({
							name: $scope.exercises[i].exercisename
						})
					}		
				}
				$scope.trainerexercises = exerciseName
				$scope.count = $scope.exercises.length
				break 
		}
	}

	// mainFactory.getAllYourExercises(trainer.id, function(data){
	// 	for(var i = 0; i < data.length; i++){
	// 		data[i].name = data[i].name.toLowerCase()
	// 	}
	// 	console.log($scope.exercises)
	// 	var exerciseName = [];
	// 	for(var i = 0; i < $scope.exercises.length; i++){  //drop downlist
	// 		exerciseName.push({
	// 			name: $scope.exercises[i].exercisename
	// 		})
	// 	}
	// 	$scope.trainerexercises = exerciseName
	// })


	$scope.addExercise = function(exercise) {
		exercise.trainer_id = angular.fromJson(window.localStorage['savedUser']).id
		mainFactory.addExercise(exercise, $stateParams.id, function(data){
			$scope.exercises = data
			$state.go('trainee', {id: $scope.trainee.id})
		})
	}
/////////////////////////////////////////////////////////////
	$scope.showExercise = function(exercise) {
		var trainer = angular.fromJson(window.localStorage.getItem('savedUser'))
		exercise.traineefirstname = $scope.trainee.first_name
		exercise.traineelastname = $scope.trainee.last_name
		exercise.trainerfirstname = trainer.first_name
		exercise.trainerlastname = trainer.last_name
		exercise.trainerid = trainer.id
		window.localStorage['traineeExercise'] = angular.toJson(exercise)
		$state.go('exercise', {id: exercise.exerciseid})
	}
/////////////////////////////////////////////////////////////
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
			$scope.reloadTraineesExercise()
		})
	}


	$scope.getExerciseByName = function(name) {
		var apiUrl = "https://vast-depths-36442.herokuapp.com"
		var apiLocal = "http://localhost:8000"
		var counter = 0;
		$scope.hideGraph = true
		$scope.exercises = selectExercises
		var filteredExercises = [];
		for(var i = 0; i < selectExercises.length; i++) {
			if($scope.exercises[i].exercisename === name ){
				filteredExercises.push($scope.exercises[i])
			}
		}
		$scope.exercises = filteredExercises
		$scope.count = $scope.exercises.length
		console.log(selectExercises)


				for (var i=0; i < selectExercises.length; i++) {
									// var wt_val = [0,0,0,0,0,0]
									// var wt_size =  [0,0,0,0,0,0]
					var split_wt = (selectExercises[i].wts).split(",")
					var wt_val = [0,0,0,0,0,0]
					var wt_size =  [0,0,0,0,0,0]

					var count = split_wt.length
						for (var h = 0; h < count ; h++) {
							wt_val[h] = split_wt[h]
							wt_size[h] = 1
						} 	

					var created_at = selectExercises[i].created_at

					graphData.push({
						"date": moment(created_at).format('YYYY-MM-DD'), 
						"ay": wt_val[0],
						"by": wt_val[1],
						"cy": wt_val[2],
						"dy": wt_val[3],
						"ey": wt_val[4],
						"fy": wt_val[5],
						 "aValue": wt_size[0],
			       "bValue": wt_size[1],
			       "cValue": wt_size[2],
			       "dValue": wt_size[3],
			       "eValue": wt_size[4],
			       "fValue": wt_size[5]
					})
				}

			$scope.minDate = Math.max.apply(Math, selectExercises.map(function(o){return o.created_at}))
			$scope.maxDate = Math.min.apply(Math, selectExercises.map(function(o){return o.created_at}))
			
			$scope.minDate = moment($scope.minDate).format('YYYY-MM-DD')
			$scope.maxDate = moment($scope.maxDate).format('YYYY-MM-DD')
				
				$scope.minDate = $scope.minDate.toString();

				date_range_min = '2017-01-17'
				date_range_max = '2017-06-31'

				date_range_min = $scope.minDate
				date_range_max = $scope.maxDate
				
				var dbData = $scope.allData
				var count = $scope.allData.length
				var date_array = []
				var date_array_count = []
				//console.log(count)

				$scope.chart()	
	}	
	
			
	$scope.chart = function () {

			var chartData2 = graphData
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
					        // "labelRotation": 45,
					        "type": "date",
					        "minPeriod": "dd",
					        // "minimumDate": new Date(date_range_min),
					        // "maximumDate": new Date(date_range_max)
					    }],
					    // case "bottom":c=0;e=k;g?(d=0,f=l):(d=l,f=l+1E3);break;
					    "allLabels": [],
					    "titles": [],
					    "dataProvider": chartData2,

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
					    },

				});
			}
			loadChart()
	}
})