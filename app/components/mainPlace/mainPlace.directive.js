'use strict';

angular.module('myApp.mainPlace', [])
    .directive('mainPlace', function () {
        return {
            restrict: 'E',
            scope: {
                size: '=size',
                tile2: '=tile2',
                level: '=level'
            },
            templateUrl: '../app/components/mainPlace/mainPlace.html',
            controller: function ($scope, $rootScope) {
                createGrid($scope.size, 64, $scope.level);

                function createGrid(gridSize, tileSize, level) {
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

                            var _tile = tile.createTile(level, tileSize, tileSize);
                            tiles.push(_tile);
                            _tile.onclick = $scope.tile2;
                            column.appendChild(_tile);
                        }
                    }

                    $rootScope.centerTile = tiles[Math.floor(Math.random() * tiles.length)];
                    $rootScope.centerTile = tile.copyTile($rootScope.centerTile);

                    centerCell.appendChild($rootScope.centerTile);

                    $rootScope.createGrid = createGrid;
                }
            }
        }
    });