'use strict';

angular.module('myApp.header', [])
    .directive('header', function () {
        return {
            restrict: 'E',
            scope: {
                result: '=result'
            },
            templateUrl: '../app/components/header/header.html',
            controller: function ($scope) {
                $scope.peopleCount= 0;

                setInterval(function () {
                    if (document.getElementById('s-screen').style.display != "none"
                    || document.getElementById('history').style.display != "none")
                        return;

                    $scope.peopleCount += Math.floor(Math.random() * (200 - 20 + 1)) + 20;
                    document.getElementById('death_id').innerText = $scope.peopleCount;
                    document.getElementById('death_id').textContent = $scope.peopleCount;
                }, 1000);
            }
        }
    });