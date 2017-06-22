app.controller('exerciseController', ["$scope", 'mainFactory','$http', '$location', '$stateParams', '$state', '$timeout', '$csv',
	function($scope, mainFactory, $http, $location, $stateParams, $state, $timeout, $csv){

	mainFactory.getOneExercise($stateParams.id, function(data){

		$scope.exercises = data.data;
	})

	$scope.addSet = function() {
		$state.go('addSet', {id: $stateParams.id})
	}

	$scope.sendSet = function(set) {
		mainFactory.addSet($stateParams.id, set, function(data){
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

	$scope.graph = function(setid) {
		$state.go('graph', {id: setid})
	}


}])