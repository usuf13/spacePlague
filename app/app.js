'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.splashScreen.splashScreen.directive'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
