'use strict';

angular.module('myApp.matrix', [])
    .directive('matrix', function () {
        return {
            restrict: 'E',
            scope: {
                size: '=size'
            },
            templateUrl: '../app/components/matrix/matrix.html',
            controller: function ($scope) {
                angular.element(document).ready(function () {
                    var matrix_size = $scope.size;

                    var buildItem = function (j, i, el, mainItem) {
                        if (!mainItem) {
                            $(document.createElement("div"))
                                .addClass("cellWrapper")
                                .css("left", parseInt((j - 1) * 70, 10) + "px")
                                .css("top", parseInt((i - 1) * 70, 10) + "px")
                                .width(70).height(70)
                                .data("row", i).data("col", j)
                                .appendTo("#grid")
                                .on("click", cellClick)
                                .on("mouseenter", {isMatrix: false}, cellMouseEnter)
                                .on("mouseleave", cellMouseLeave);
                        }

                        $(document.createElement("div"))
                            .addClass("cell cellUnselected")
                            .css("left", parseInt((j - 1) * 70, 10) + "px")
                            .css("top", parseInt((i - 1) * 70, 10) + "px")
                            .html(el)
                            .appendTo("#grid");
                    };

                    var rand = null;
                    $scope.createGrid = function () {
                        var grid_matrix = $("#grid");
                        grid_matrix.html("");

                        var startEmpty = Math.floor(matrix_size / 2);
                        var endEmpty = startEmpty + 2;

                        var titleArray = [];

                        for (var i = 1; i <= matrix_size; i++) {
                            for (var j = 1; j <= matrix_size; j++) {
                                if (i >= startEmpty && i <= endEmpty && j >= startEmpty && j <= endEmpty) {
                                    continue;
                                }

                                var el = tile.createTile(5);
                                titleArray.push(el);

                                buildItem(j, i, el, false);
                            }
                        }

                        rand = titleArray[Math.floor(Math.random() * titleArray.length)];
                        buildItem(startEmpty + 1, startEmpty + 1, tile.copyTile(rand), true);

                        grid_matrix.height(70 * matrix_size);
                        grid_matrix.width(70 * matrix_size);
                    };

                    function cellClick() {
                        var cell = $(this).next();

                        var id = cell[0].getElementsByTagName('canvas')[0].id;
                        if (id == rand.id)
                            alert('good');
                        else
                            alert('bad');
                    }

                    function cellMouseEnter(e) {
                        var i = $(this).data("row");
                        var j = $(this).data("col");

                        var x = e.data.isMatrix ? Math.ceil((matrix_size * 50) / matrix_size) : 50;

                        var div = $(document.createElement("div"))
                            .addClass("cell_coordinates cell_coord_text")
                            .css("left", parseInt((j - 1) * x, 10) + "px")
                            .css("top", parseInt((i - 1) * x, 10) + "px");

                        $(this).before(div);
                    }

                    function cellMouseLeave() {
                        $(this).prev().remove();
                    }

                    $scope.createGrid();
                });
            }
        }
    });