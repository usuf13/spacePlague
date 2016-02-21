'use strict';

angular.module('myApp.mainPlace', [])
    .directive('mainPlace', function () {
        return {
            restrict: 'E',
            templateUrl: '../app/components/mainPlace/mainPlace.html',
            controller: function ($scope) {
                createGrid(11, 64);

               // $scope.centerTile = null;

                function createGrid(gridSize, tileSize) {
                    var div = document.getElementById("body");

                    while (div.hasChildNodes()) {
                        div.removeChild(div.lastChild);
                    }

                    var realTileSize = tileSize + 6; //because one border 3px

                    var firstCenterCell = Math.floor(gridSize / 2);
                    var endCenterCell = firstCenterCell + 2;

                    var grid = document.createElement('div');
                    grid.className = "container";
                    div.appendChild(grid);

                    var centerCell = null;
                    var tiles = [];
                    for (var i = 1; i <= gridSize; i++) {
                        var row = document.createElement('div');
                        row.className = "row";

                        grid.appendChild(row);
                        for (var j = 1; j <= gridSize; j++) {
                            var column = document.createElement('div');
                            column.className = "column";

                            row.appendChild(column);

                            if (i == firstCenterCell + 1 && j == firstCenterCell + 1) {
                                centerCell = column;
                                continue;
                            }
                            else if (i >= firstCenterCell && i <= endCenterCell
                                && j >= firstCenterCell && j <= endCenterCell) {
                                continue;
                            }

                            var _tile = tile.createTile(5, tileSize, tileSize);
                            tiles.push(_tile);
                            _tile.onclick = tileClick;
                            column.appendChild(_tile);
                        }
                    }

                    $scope.centerTile = tiles[Math.floor(Math.random() * tiles.length)];
                    $scope.centerTile = tile.copyTile($scope.centerTile);

                    centerCell.appendChild($scope.centerTile);
                }

                function tileClick() {
                    if ($scope.centerTile.id == this.id)
                        alert("Won");
                    else
                        alert("Lost");

                    createGrid(9, 64);
                }

                function changeLevel(level) {
                    var canvasArr = document.getElementsByTagName("canvas");

                    for (var index = 0; index < canvasArr.length; index++) {
                        var canvas = canvasArr[index];

                        tile.setLevel(canvas, level);
                    }
                }
            }
        }
    });