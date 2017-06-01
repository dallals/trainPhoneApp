
app.factory('mainFactory', function($http, $location, $state){
	var factory = {}
	var trainersTrainees
	// var trainer = angular.fromJson(window.localStorage['savedUser'])
	
	$http.defaults.headers.common.Authorization = angular.fromJson(window.localStorage['authToken'] || '[]')
	var token = $http.defaults.headers.common.Authorization
	var apiUrl = "https://vast-depths-36442.herokuapp.com"
	var localApi = "http://localhost:8000"
	// console.log(window.localStorage)

		factory.signInTrainer = function(trainer, callback){
			$http.post(apiUrl + '/trainers/authenticate.json', trainer).then(function(data) {
				if(data.data.success === false){
				} else {
					callback(data.data)
				}
			})
		};

		factory.getTrainersTrainees = function(id, callback) {
			$http.get(apiUrl+'/trainers/trainees.json', ({params:{trainer_id: id}})).then(function(data){
				callback(data)
			})
		};

		factory.getOneTrainee = function(id, callback) {
			$http.get(apiUrl+'/trainees/show/'+id+'.json').then(function(data){
				callback(data)
			})
		};

		factory.getAllTraineeExercises = function(id, callback) {
			$http.get(apiUrl+'/trainees/exercises/'+id+'.json').then(function(data) {
				callback(data.data);
			})
		};

		factory.getOneExercise = function(id, callback) {
			$http.get(apiUrl+'/exercises/'+id+'.json').then(function(data){
				callback(data)
			})
		};

		factory.getOneTrainer = function(id, callback){
			var userCheck = angular.fromJson(window.localStorage['savedUser'])
			if(userCheck.id == id) {
				$http.get(apiUrl+'/trainers/trainers/'+id+'.json').then(function(data){
					callback(data)
				})			
			} else {
				$state.go('trainers', {id: userCheck.id} )
			}
		};

		factory.removeTrainee = function(trainee, callback) {
			var userCheck = angular.fromJson(window.localStorage['savedUser']);
			var trainer_id = userCheck.id
			if(trainee.trainer === trainer_id){
				$http.delete(apiUrl+'/trainee/'+trainee.id, ({params:{trainer_id: trainer_id}})).then(function(data){
					callback(data)
				})
			}
		};

		factory.removeSet = function(id, setid, callback) {
			$http.delete(apiUrl+'/sets/'+setid, ({params:{id: id}})).then(function(data) {
				callback(data)
			})
		};

		factory.deleteExercise = function(exercise, callback) {
			$http.delete(apiUrl+'/exercise/'+exercise.exerciseid, ({params:{trainee_id: exercise.trainee_id}})).then(function(data){
				callback(data.data)
			})
		};

		factory.signUpTrainee = function(trainee, callback){
			$http.post(apiUrl+'/trainees/register.json', trainee).then(function(data){
				if(data.data.success === false){
					console.log(data.data.success)
					callback(data.data)
				}
				trainersTrainees = data
				callback(data)
			})
		};

		factory.addExercise = function(exercise, id, callback){
			var userCheck = angular.fromJson(window.localStorage['savedUser']);
			exercise.trainer_id = userCheck.id
			$http.post(apiUrl+'/add/exercise/'+id, exercise).then(function(data){
				callback(data)
			})
		};

		factory.getTypes = function(callback) {
			$http.get(apiUrl+'/gettypes').then(function(data){
				callback(data)
			})
		};

		factory.addSet = function(id, set, callback) {
			$http.post(apiUrl+'/addSet/'+id, set).then(function(data){
				callback(data)
			})
		};

	return factory
})