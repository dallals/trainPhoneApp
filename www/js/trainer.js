angular.module('trainer.loggedIn', [])

	.factory('Trainer', function() {
		var loggedIn = window.localStorage.getItem('trainerLoggedIn') || false

		return {

			login: function(trainer) {
				loggedIn = window.localStorage.getItem('trainerLoggedIn') || true;
			},


			isLoggedIn: function() {
				return loggedIn;
			}

		}

	})