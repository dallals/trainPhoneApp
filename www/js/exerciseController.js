app.controller('exerciseController', ["$scope", 'mainFactory','$http', '$location', '$stateParams', '$state', '$timeout', '$csv',
	function($scope, mainFactory, $http, $location, $stateParams, $state, $timeout, $csv){

	mainFactory.getOneExercise($stateParams.id, function(data){
		$scope.exercises = data.data;
			
			$scope.exercise = angular.fromJson(window.localStorage.getItem('traineeExercise'))
			var testData = angular.fromJson(window.localStorage.getItem('traineeExercise'))

			$scope.counts = $scope.exercise.reps.split(',').length
			var number = Number($scope.counts)
			$scope.weight = $scope.exercise.reps.split(',')
			$scope.reps = $scope.exercise.wts.split(',')

			var newExercises = [];
			var csvFileNames = [];
				for(var i = 0; i < number; i++){
					newExercises.push({
						setname: 'placeholder',
						created_at: testData.created_at,
						exerciseid: testData.exerciseid,
						exercisetypename: testData.exercisetypename,
						reps: testData.reps,
						trainee_id: testData.trainee_id,
						wts: testData.wts,
						traineefirstname: testData.traineefirstname,
						traineelastname: testData.traineelastname,
						trainerlastname: testData.trainerlastname,
						trainerfirstname: testData.trainerfirstname,
						trainerid: testData.trainerid,
						fileName: 'Placeholder'
					})
				}

				
				$scope.exercises = newExercises
		

			for(var i = 0; i < $scope.exercises.length; i++){
					var count = 1
					count = count + i
					$scope.exercises[i].setname = "Set" + ' ' + count 
			}

			for(var i = 0; i<$scope.exercises.length; i++){
				$scope.exercises[i].reps = $scope.exercises[i].reps.split(',')
				$scope.exercises[i].wts = $scope.exercises[i].wts.split(',')
				$scope.exercises[i].reps = $scope.exercises[i].reps[i]
				$scope.exercises[i].wts = $scope.exercises[i].wts[i]
			}

			for(var i = 0; i< $scope.exercises.length; i++) {
				csvFileNames.push(`${$scope.exercises[i].traineefirstname}_${$scope.exercises[i].traineelastname}_trainerId_${$scope.exercises[i].trainerid}_traineeId_${$scope.exercises[i].trainee_id}_reps_${$scope.exercises[i].reps}_weight_${$scope.exercises[i].wts}.csv`)
				$scope.exercises[i].fileName = `${$scope.exercises[i].traineefirstname}_${$scope.exercises[i].traineelastname}_trainerId_${$scope.exercises[i].trainerid}_traineeId_${$scope.exercises[i].trainee_id}_reps_${$scope.exercises[i].reps}_weight_${$scope.exercises[i].wts}.csv`
			}
			// console.log($scope.exercises)
			// $cookies.putObject('csvFile', csvFileNames);
			$scope.csvFileNames = csvFileNames
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