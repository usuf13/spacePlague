'use strict';

angular.module('myApp', [
    'ngRoute',
    'myApp.splashScreen',
    'myApp.matrix',
    'myApp.sideBar',
    'myApp.historyMenu',
    'myApp.homeController'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
