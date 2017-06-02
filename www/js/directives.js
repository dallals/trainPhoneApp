app.directive('amcharts', function() {

	return {

		restrict: "E",
		template: '<div id="chartdiv" style="width:100%; height:500px;"></div>',
		controller: function($scope, mainFactory, $http, $location, $stateParams, $state, $csv) {
			$scope.chart = function () {
				var Url = 'assets/SensorFusion.csv';

				$http.get(Url).then(function(data) {
					var chartData = $csv.convertStringToJson(data.data)
					var dataChart = [];
					$scope.setNameFromDataChart = [];
					for(var i=0; i<chartData.length; i=i+1){

            if(i !== chartData.length - 1){
                dataChart.push({
                    time: chartData[i].year,
                    value: chartData[i].value
                })
            }
            if(i === chartData.length - 1){
                $scope.setNameFromDataChart.push({
                    name: chartData[i].year,
                    value: chartData[i].value
                })
            }
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

			}
		}

})