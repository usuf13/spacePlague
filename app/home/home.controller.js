'use strict';

angular.module('myApp.homeController', [])
    .controller('homeController', function ($scope, $rootScope) {
        $scope.config = {
            tilesCount: 80,
            level1: {
                tilesCount: 5,
                gridSize: 7
            },
            level2: {
                tilesCount: 10,
                gridSize: 9
            },
            level3: {
                tilesCount: 15,
                gridSize: 9
            },
            level4: {
                tilesCount: 20,
                gridSize: 11
            },
            level5: {
                tilesCount: 30,
                gridSize: 11
            }
        }

        $scope.currentSize = 7;
        $scope.currentLevel = 1;

        $scope.foundTiles = 0;

         $scope.tileClick = function() {
             if ($rootScope.centerTile.id == this.id) {
                 $scope.foundTiles++;
                 checkState();
             }
             else if ($scope.foundTiles >= 0)
                 $scope.foundTiles--;

             var fillPercent = ($scope.foundTiles * 100 / $scope.config.tilesCount) + '%';
             if (fillPercent > 100)
                 fillPercent = 100;

             document.getElementById('dna').style.height = fillPercent;

            $rootScope.createGrid($scope.currentSize, 64, $scope.currentLevel);
         }

         function checkState()
         {
             switch ($scope.foundTiles) {
                 case $scope.config.level1.tilesCount:
                     $scope.currentSize = $scope.config.level1.gridSize;
                     $scope.currentLevel++;
                     break;
                 case $scope.config.level2.tilesCount:
                     $scope.currentSize = $scope.config.level2.gridSize;
                     $scope.currentLevel++;
                     break;
                 case $scope.config.level3.tilesCount:
                     $scope.currentSize = $scope.config.level3.gridSize;
                     $scope.currentLevel++;
                     break;
                 case $scope.config.level4.tilesCount:
                     $scope.currentSize = $scope.config.level4.gridSize;
                     $scope.currentLevel++;
                     break;
                 case $scope.config.level5.tilesCount:
                     $scope.currentSize = $scope.config.level5.gridSize;
                     $scope.currentLevel++;
                     break;
                 case $scope.config.tilesCount:
                     alert("Win");
                     break;
             }

            
         }
    });