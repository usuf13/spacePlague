'use strict';

angular.module('myApp.homeController', [])
    .controller('homeController', function ($scope, $rootScope) {
        setTimeout(function(){
            document.getElementById('s-screen').style.display = "none";
        }, 1000*6);


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
        };

        $scope.currentSize = 7;
        $scope.currentLevel = 1;

        $rootScope.foundTiles = 0;

         $scope.tileClick = function() {
             if ($rootScope.centerTile.id == this.id) {
                 $rootScope.foundTiles++;
                 checkState();
             }
             else if ($rootScope.foundTiles > 0)
                 $rootScope.foundTiles--;

             document.getElementById('result_id').innerText = $rootScope.foundTiles;

             var fillPercent = ($rootScope.foundTiles * 100 / $scope.config.tilesCount) + '%';
             if (fillPercent > 100)
                 fillPercent = 100;

             document.getElementById('dna').style.height = fillPercent;

            $rootScope.createGrid($scope.currentSize, 64, $scope.currentLevel);
         }

         function checkState()
         {
             switch ($rootScope.foundTiles) {
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