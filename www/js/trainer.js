angular.module('trainer.loggedIn', [])

	.factory('Trainer', function() {
		var loggedIn = false;

		return {

			login: function(trainer) {
				loggedIn = true;
			},


			isLoggedIn: function() {
				return loggedIn;
			}

		}

	})