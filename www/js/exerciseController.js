app.controller('exerciseController', ["$scope", 'mainFactory','$http', '$location', '$cookies', '$stateParams', '$state',
	function($scope, mainFactory, $http, $location, $cookies, $stateParams, $state){


		mainFactory.getOneExercise($stateParams.id, function(data){
			console.log(data.data)
			$scope.exercises = data.data
			if($scope.exercises[0].trainerid != $cookies.getObject('userCookie').id){
				$location.path('/trainers/'+$cookies.getObject('userCookie').id)
			}
		})

}])