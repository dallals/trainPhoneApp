
app.factory('mainFactory', function($http, $location, $cookies, $state){
	var factory = {}
	var trainersTrainees
	// var userCheck = angular.fromJson(window.localStorage['savedUser'] || '')
	$http.defaults.headers.common.Authorization = angular.fromJson(window.localStorage['authToken'] || '[]')


		factory.signInTrainer = function(trainer, callback){
			$http.post('https://vast-depths-36442.herokuapp.com/trainers/authenticate.json', trainer).then(function(data) {
				if(data.data.success === false){
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
			var userCheck = angular.fromJson(window.localStorage['savedUser'])
			if(userCheck.id == id) {
				$http.get('https://vast-depths-36442.herokuapp.com/trainers/trainers/'+id+'.json').then(function(data){
					callback(data)
				})			
			} else {
				$state.go('trainers', {id: userCheck.id} )
			}
		}

		factory.removeTrainee = function(trainee, callback) {
			var userCheck = angular.fromJson(window.localStorage['savedUser']);
			var trainer_id = userCheck.id
			if(trainee.trainer === trainer_id){
				$http.delete('https://vast-depths-36442.herokuapp.com/trainee/'+trainee.id, ({params:{trainer_id: trainer_id}})).then(function(data){
					callback(data)
				})
			}
		}

		factory.signUpTrainee = function(trainee, callback){
			$http.post('https://vast-depths-36442.herokuapp.com/trainees/register.json', trainee).then(function(data){
				trainersTrainees = data
				callback(data)
			})
		};

	return factory
})