
app.factory('mainFactory', function($http, $location, $cookies, $state){
	var factory = {}
	// var userCheck = angular.fromJson(window.localStorage['savedUser'] || '')
	$http.defaults.headers.common.Authorization = angular.fromJson(window.localStorage['authToken'] || '[]')

		factory.signInTrainer = function(trainer, callback){
			$http.post('https://vast-depths-36442.herokuapp.com/trainers/authenticate.json', trainer).then(function(data) {
				if(data.data.success === false){
					// console.log(data.data)
				} else {
					callback(data.data)
				}
			})
		};

		factory.getTrainersTrainees = function(id, callback) {
			$http.get('https://vast-depths-36442.herokuapp.com/trainers/trainees.json', ({params:{trainer_id: id}})).then(function(data){
				callback(data)
			})
		};

		factory.getOneTrainee = function(id, callback) {
			$http.get('https://vast-depths-36442.herokuapp.com/trainees/show/'+id+'.json').then(function(data){
				callback(data)
			})
		};

		factory.getAllTraineeExercises = function(id, callback) {
			$http.get('https://vast-depths-36442.herokuapp.com/trainees/exercises/'+id+'.json').then(function(data) {
				callback(data.data);
			})
		};

		factory.getOneExercise = function(id, callback) {
			$http.get('https://vast-depths-36442.herokuapp.com/exercises/'+id+'.json').then(function(data){
				callback(data)
			})
		};

		factory.getOneTrainer = function(id, callback){
			console.log(id)
			var userCheck = angular.fromJson(window.localStorage['savedUser'])
			if(userCheck.id == id) {
				$http.get('https://vast-depths-36442.herokuapp.com/trainers/trainers/'+id+'.json').then(function(data){
					callback(data)
				})			
			} else {
				$state.go('trainers', {id: userCheck.id} )
			}
		}

	return factory
})