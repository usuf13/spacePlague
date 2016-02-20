'use strict';

angular.module('myApp', [
    'ngRoute',
    'myApp.splashScreen.splashScreen.directive',
    'myApp.homeController'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../app/Home/home.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
