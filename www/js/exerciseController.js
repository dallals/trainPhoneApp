app.controller('exerciseController', ["$scope", 'mainFactory','$http', '$location', '$stateParams', '$state', '$timeout', '$csv',
	function($scope, mainFactory, $http, $location, $stateParams, $state, $timeout, $csv){


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

	// var convertCSV = function (){ 
	// 	var Url = '/assets/SensorFusion.csv'
	// 	var set = $http.get(Url).then(function(data) {
	// 		console.log($csv.convertStringToJson(data.data))
	// 		return $csv.convertStringToJson(data.data)
	// 	}) 
	// }
	// convertCSV();

}])