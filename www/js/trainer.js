// angular.module('trainer.loggedIn', [])

	app.factory('Trainer', function($http) {
		var loggedIn = window.localStorage.getItem('trainerLoggedIn') || false
		var isTrainersTrainee = false
		var trainerTrainee = angular.fromJson(window.localStorage['savedUser'])

		return {

			login: function(trainer, compareEmail) {
				if(trainer.email === compareEmail.trainer.email) {
					loggedIn = window.localStorage.getItem('trainerLoggedIn') || true;
				} else {
					loggedIn = false;
	 				$http.defaults.headers.common.Authorization = '';
	        window.localStorage.removeItem('savedUser');
	        window.localStorage.removeItem('authToken');
	        window.localStorage.removeItem('trainerLoggedIn');
				}
				
			},
			// login: function() {
				
			// 	loggedIn = window.localStorage.getItem('trainerLoggedIn') || true;
				
			// },


			compareTrainee: function(trainerTrainee, trainee) {
				if(trainerTrainee.id === trainee.trainer_id){
					isTrainersTrainee = true
					console.log(isTrainersTrainee)
					return isTrainersTrainee;
				} else {
					return isTrainersTrainee
				}
			},

			isLoggedIn: function() {
				return loggedIn;
			}

		}

	})