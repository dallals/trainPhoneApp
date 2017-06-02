app.controller('indexController', function($scope, $http, mainFactory, $location, $state, $ionicHistory, Trainer, $stateParams) {

	$scope.checkTrainer = window.localStorage.getItem('trainerLoggedIn') || undefined

		$scope.signInTrainer = function(trainer) {
			var email = trainer.email.toLowerCase()
			trainer.email = email
			mainFactory.signInTrainer(trainer, function(oneTrainer){
				// var id = oneTrainer.trainer.id
				console.log(oneTrainer, 'index controller')
				window.localStorage['savedUser'] = angular.toJson(oneTrainer.trainer)
				window.localStorage['authToken'] = angular.toJson(oneTrainer.token)

				var token = angular.fromJson(window.localStorage['authToken'])
				$http.defaults.headers.common.Authorization = token
				$scope.signedIn = true
				$ionicHistory.nextViewOptions({historyRoot: true})
				window.localStorage['trainerLoggedIn'] = true
				Trainer.login(trainer, oneTrainer)
				// Trainer.login()
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

		$scope.signup = function(){
			console.log('getting signup')
			$state.go('trainerssignup')
		}

		$scope.signUpTrainer = function (trainer) {
			var email = trainer.email.toLowerCase();
			trainer.email = email
			mainFactory.signUpTrainer(trainer, function(data){
				$scope.trainer = data.data
			})
			$scope.signInTrainer($scope.trainer)
		}

		$scope.clientButton = function(){
			$state.go('trainers')
		};

		$scope.addWorkOut = function(id) {
			$state.go('addExercise', {id: id})
		};

		$scope.addSet = function() {
			$state.go('addSet', {id: $stateParams.id})
		}

		$scope.signUp = function() {
			$state.go('signuptrainee')
		}
		$scope.yourExercises = function() {
			$state.go('showtrainersexercises', {id: $stateParams.id})
		}
		$scope.yourExercisesFromAddExercise = function(id) {
			$state.go('showtrainersexercises', {id: id})
		}
		$scope.addTrainerExercises = function() {
			$state.go('addtrainersexercises', {id: $stateParams.id})
		}
})

// app.controller('deviceController', function(){

// 	document.addEventListener('deviceready', function() {
// 		console.log('devise is' + angular.toJson(device));
// 	})

// })