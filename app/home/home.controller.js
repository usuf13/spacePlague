'use strict';

angular.module('myApp.homeController', [])
    .controller('homeController', function ($scope, $rootScope) {
        setTimeout(function(){
            document.getElementById('s-screen').style.display = "none";
            document.getElementById('history').style.display = "block";
            $rootScope.terminal();
        }, 1000*4);


        $scope.config = {
            tilesCount: 25,
            level1: {
                tilesCount: 0,
                gridSize: 7
            },
            level2: {
                tilesCount: 5,
                gridSize: 9
            },
            level3: {
                tilesCount: 10,
                gridSize: 9
            },
            level4: {
                tilesCount: 15,
                gridSize: 11
            },
            level5: {
                tilesCount: 20,
                gridSize: 11
            }
        };

        $scope.currentSize = 7;
        $scope.currentLevel = 1;
        $scope.minFragments = 0;

        $rootScope.foundTiles = 0;

         $scope.tileClick = function() {
             if ($rootScope.centerTile.id == this.id) {
                  var audio = new Audio('./audio/good.wav');
                     audio.play();

                 $rootScope.foundTiles++;
                 checkState();
             }
             else{
                 var audio = new Audio('./audio/fails.wav');
                 audio.play();

                 if ($rootScope.foundTiles > $scope.minFragments)
                    $rootScope.foundTiles--;
             }

             document.getElementById('result_id').innerText = $rootScope.foundTiles;
             document.getElementById('result_id').textContent = $rootScope.foundTiles;

             var fillPercent = ($rootScope.foundTiles * 100 / $scope.config.tilesCount) + '%';
             if (fillPercent > 100)
                 fillPercent = 100;

             document.getElementById('dna').style.height = fillPercent;

            $rootScope.createGrid($scope.currentSize, 64, $scope.currentLevel);
         }

         $scope.won = false;
        
         function checkState()
         {
             switch ($rootScope.foundTiles) {
                 case $scope.config.level1.tilesCount:
                     $scope.currentSize = $scope.config.level1.gridSize;
                     $scope.currentLevel++;
                     break;
                 case $scope.config.level2.tilesCount:
                     $scope.minFragments = $scope.config.level2.tilesCount;
                     $scope.currentSize = $scope.config.level2.gridSize;
                     $scope.currentLevel++;
                     break;
                 case $scope.config.level3.tilesCount:
                     $scope.minFragments = $scope.config.level3.tilesCount;
                     $scope.currentSize = $scope.config.level3.gridSize;
                     $scope.currentLevel++;
                     break;
                 case $scope.config.level4.tilesCount:
                     $scope.minFragments = $scope.config.level4.tilesCount;

                     if (screen.height > 1000)
                         $scope.currentSize = $scope.config.level4.gridSize;
                     else
                         $scope.currentSize = 9;

                     $scope.currentLevel++;
                     break;
                 case $scope.config.level5.tilesCount:
                     $scope.minFragments = $scope.config.level5.tilesCount;

                     if (screen.height > 1000)
                         $scope.currentSize = $scope.config.level5.gridSize;
                     else
                         $scope.currentSize = 9;

                     $scope.currentLevel++;
                     break;
                 case $scope.config.tilesCount:
                     if ($scope.won)
                         return;

                     $scope.minFragments = $scope.config.tilesCount;

                     $scope.won = true;

                     var audio = new Audio('./audio/win.mp4');
                     audio.play();

                     document.getElementById('win').style.display = "block";
                     break;
             }
         }
    });