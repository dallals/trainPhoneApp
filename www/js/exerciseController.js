app.controller('exerciseController', ["$scope", 'mainFactory','$http', '$location', '$cookies', '$stateParams', '$state', '$timeout', '$csv',
	function($scope, mainFactory, $http, $location, $cookies, $stateParams, $state, $timeout, $csv){


		// console.log($stateParams.id, 'exercise')


		mainFactory.getOneExercise($stateParams.id, function(data){
			// window.ID37632 = $stateParams.id
			$scope.exercises = data.data;
		})

		$scope.addSet = function() {
			$state.go('addSet', {id: $stateParams.id})
		}

		$scope.sendSet = function(set) {
			mainFactory.addSet($stateParams.id, set, function(data){
				// $state.go('exercise', {id: $scope.exercises[0].exerciseid})
			})
			mainFactory.getOneExercise($stateParams.id, function(data){
				$scope.exercises = data.data
				$state.go('exercise', {id: $stateParams.id})
			})

		}

		$scope.refreshSet = function() {
			mainFactory.getOneExercise($stateParams.id, function(data){
				$scope.exercises = data.data
				$scope.$broadcast('scroll.refreshComplete');
			})
		}

	$scope.clientButton = function(){
		$state.go('trainers')
	}

	$scope.removeSet = function(setid) {
		mainFactory.removeSet($stateParams.id, setid, function(data) {
			$scope.exercises = data.data;
		})
	}

	var convertCSV = function (){
		var Url = '/assets/SensorFusion.csv'
		var set = $http.get(Url).then(function(data) {
			console.log($csv.convertStringToJson(data.data))
			return $csv.convertStringToJson(data.data)
		}) 
	}
	// convertCSV();
		$scope.chart = function () {
			var Url = '/assets/SensorFusion.csv';
			// var chart;
			// var graph;

			$http.get(Url).then(function(data) {
				var chartData = $csv.convertStringToJson(data.data)
				var dataChart = [];
				for(var i=0; i<chartData.length; i=i+1){
					dataChart.push({
						date: `${chartData[i].year}`,
						value: `${chartData[i].value}`
					})
				}

				var seconds = ((chartData[0].year % 60000) / 1000).toFixed(2).toString();
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
							      "adjustBorderColor": false,
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
							    "valueField": "value",
							    "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
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
							  "categoryField": "date",
							  "categoryAxis": {
									"autoGridCount": false,
								 	"gridCount": 10,
								  "gridPosition": "start",
							    "labelRotation": 90
							  },
							  "export": {
							    "enabled": true
							  },
							  "dataProvider": dataChart
							} );
										}
				loadChart()
 
			})
		}
		$scope.chart()
}])