// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('trainer', ['ionic', 'ngCordova', 'ngcsv', 'ui.gravatar']);


app.config(function(gravatarServiceProvider){
    gravatarServiceProvider.defaults = {
      size     : 100,
      "default": 'mm'  // Mystery man as default for missing avatars
    };
    gravatarServiceProvider.secure = true;
})

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('index', {
    url: '/index',
    templateUrl: 'partials/index.html',
    controller: 'indexController',
    cache: true
  });
  $stateProvider.state('trainerssignup', {
    url: '/signup',
    templateUrl: 'partials/signuptrainers.html',
    controller: 'indexController',
    cache: true
  });
  $stateProvider.state('trainers', {
    url: '/trainers/:id',
    templateUrl: 'partials/trainers.html',
    controller: 'trainersController',
    cache: false
  });
  $stateProvider.state('addtrainersexercises', {
    url: '/addtrainers/exercises/:id',
    templateUrl: 'partials/addtrainersexersice.html',
    controller: 'trainersController',
    cache: false
  });
  $stateProvider.state('showtrainersexercises', {
    url: '/showtrainers/exercises/:id',
    templateUrl: 'partials/showtrainersexercises.html',
    controller: 'trainersController',
    cache: false
  });
  $stateProvider.state('trainee', {
    url: '/trainees/:id',
    templateUrl: 'partials/trainees.html',
    controller: 'traineesController',
    cache: false
  });
  $stateProvider.state('exercise', {
    url: '/exercise/:id',
    templateUrl: 'partials/showexercise.html',
    controller: 'exerciseController',
    cache: false
  });
  $stateProvider.state('signuptrainee', {
    url: '/signuptrainee',
    templateUrl: 'partials/signuptrainee.html',
    controller: 'traineesController',
    cache: false
  });
  $stateProvider.state('addExercise', {
    url: '/trainees/:id',
    templateUrl: 'partials/addexercise.html',
    controller: 'traineesController',
    cache: false
  });
  $stateProvider.state('addSet', {
    url: '/exercise/:id',
    templateUrl: 'partials/addset.html',
    controller: 'exerciseController',
    cache: false
  });
  $stateProvider.state('graph', {
    url: '/graph/set/:id',
    templateUrl: 'partials/graph.html',
    controller: 'exerciseController',
    cache: false
  });
  // $stateProvider.state('tabTrainers', {
  //   url: '/trainers/:id',
  //   views: {
  //     'tab-trainer':{
  //       templateUrl: 'partials/trainers.html'
  //     }
  //   },
  //   controller: 'trainersController',
  //   cache: false
  // })

  $urlRouterProvider.otherwise('/index');
})

app.run(function($rootScope, $state, $ionicPlatform, Trainer) {
  $rootScope.$on('$stateChangeStart', function(event, toState) {

    if(!Trainer.isLoggedIn() && toState.name !== 'index' && toState.name !== 'trainerssignup') {
      event.preventDefault();
      $state.go('index')
    }
  });

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
