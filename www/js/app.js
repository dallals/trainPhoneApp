// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('trainer', ['ionic', 'ngCookies']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('index', {
    url: '/index',
    templateUrl: 'partials/index.html',
    controller: 'indexController'
  });
  $stateProvider.state('trainers', {
    url: '/trainers/:id',
    templateUrl: 'partials/trainers.html',
    controller: 'trainersController'
  });
  $stateProvider.state('trainee', {
    url: '/trainees/:id',
    templateUrl: 'partials/trainees.html',
    controller: 'traineesController'
  });
  $stateProvider.state('exercise', {
    url: '/exercise/:id',
    templateUrl: 'partials/showexercise.html',
    controller: 'exerciseController'
  });
  $stateProvider.state('signuptrainee', {
    url: '/signuptrainee',
    templateUrl: 'partials/signuptrainee.html',
    controller: 'traineesController'
  });

  $urlRouterProvider.otherwise('/index');
})

app.run(function($ionicPlatform) {
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
