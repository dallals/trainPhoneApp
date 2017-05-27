app.controller('exerciseController', ["$scope", 'mainFactory','$http', '$location', '$cookies', '$stateParams', '$state', '$window',
	function($scope, mainFactory, $http, $location, $cookies, $stateParams, $state, $window){


		mainFactory.getOneExercise($stateParams.id, function(data){
			console.log(data.data, 'controller')
			window.sammyID = $stateParams.id
			$scope.exercises = data.data
		})

		$scope.addSet = function() {
			$state.go('addSet', {id: sammyID})
		}

		$scope.sendSet = function(set) {
			mainFactory.addSet($stateParams.id, set, function(data){
			})
			mainFactory.getOneExercise($stateParams.id, function(data){
				$scope.exercises = data.data
				$state.go('exercise', {id: $scope.exercises[0].exerciseid})
				// $window.location.reload();
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

}])