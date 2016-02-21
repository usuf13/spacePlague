'use strict';

angular.module('myApp.header', [])
    .directive('header', function () {
        return {
            restrict: 'E',
            scope: {
                size: '=size'
            },
            templateUrl: '../app/components/header/header.html',
            controller: function () {

            }
        }
    });