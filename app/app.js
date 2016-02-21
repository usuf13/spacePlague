'use strict';

angular.module('myApp', [
    'ngRoute',
    'myApp.splashScreen',
    'myApp.sideBar',
    'myApp.historyMenu',
    'myApp.header',
    'myApp.mainPlace',
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
