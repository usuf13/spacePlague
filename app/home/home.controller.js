'use strict';

angular.module('myApp.homeController', [])
    .controller('homeController', function ($scope, $rootScope) {
        $scope.currentSize = 7;
        $scope.currentLevel = 1;

        $scope.foundTiles = 0;

         $scope.tileClick = function() {
             if ($rootScope.centerTile.id == this.id) {
                 $scope.foundTiles++;
                 checkState();
             }
             else
                 $scope.foundTiles--;

            $rootScope.createGrid($scope.currentSize, 64, $scope.currentLevel);
         }

         function checkState()
         {
             if ($scope.foundTiles == 5)
                 $scope.currentLevel++;
             if ($scope.foundTiles == 10) {
                 $scope.currentSize = 9;
                 $scope.currentLevel++;
             }
         }
    });