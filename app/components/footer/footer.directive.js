'use strict';

angular.module('myApp.footer', [])
    .directive('footer', function () {
        return {
            restrict: 'E',
            scope: {
                size: '=size'
            },
            templateUrl: '../app/components/footer/footer.html',
            controller: function () {

            }
        }
    });