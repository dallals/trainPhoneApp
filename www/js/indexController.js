app.controller('indexController', function($scope, $http, mainFactory, $cookies, $location, $state, $ionicHistory, Trainer) {

		$scope.signInTrainer = function(trainer) {
			var email = trainer.email.toLowerCase()
			trainer.email = email
			mainFactory.signInTrainer(trainer, function(oneTrainer){
				var id = oneTrainer.trainer.id
				// $http.defaults.headers.common.Authorization = oneTrainer.token;
				// $cookies.putObject('userCookie', oneTrainer.trainer);
				window.localStorage['savedUser'] = angular.toJson(oneTrainer.trainer)
				window.localStorage['authToken'] = angular.toJson(oneTrainer.token)
				// console.log(window.localStorage)
				var token = angular.fromJson(window.localStorage['authToken'])
				$http.defaults.headers.common.Authorization = token
				$scope.signedIn = true
				$ionicHistory.nextViewOptions({historyRoot: true})
				window.localStorage['trainerLoggedIn'] = true
				Trainer.login()
				clearForm();
				$state.go('trainers')
			})
		}

    $scope.signOutUser = function(user){
        $scope.signedIn = false;
        $http.defaults.headers.common.Authorization = '';
        window.localStorage.removeItem('savedUser');
        window.localStorage.removeItem('authToken');
        window.localStorage.removeItem('trainerLoggedIn');
        console.log(window.localStorage)
        
        clearForm();
        $state.go('index');
        location.reload();
    }; 

		var clearForm = function() {
			$scope.trainer = null;
		}


})

// app.controller('deviceController', function(){

// 	document.addEventListener('deviceready', function() {
// 		console.log('devise is' + angular.toJson(device));
// 	})

// })