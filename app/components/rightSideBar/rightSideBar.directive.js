'use strict';

angular.module('myApp.sideBar', [])
    .directive('sideBar', function() {
        return {
            restrict: 'E',
            templateUrl: '../app/components/rightSideBar/rightSideBar.html',
            controller: function () {

            }
        }
    });