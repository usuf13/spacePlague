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

                    $scope.createGrid = function () {
                        var grid_matrix = $("#grid");
                        grid_matrix.html("");

                        var startEmpty = Math.floor(matrix_size / 2);
                        var endEmpty = startEmpty + 2;

                        for (var i = 1; i <= matrix_size; i++) {
                            for (var j = 1; j <= matrix_size; j++) {
                                if (i >= startEmpty && i <= endEmpty && j >= startEmpty && j <= endEmpty) {
                                    continue;
                                }

                                $(document.createElement("div"))
                                    .addClass("cellWrapper")
                                    .css("left", parseInt((j - 1) * 50, 10) + "px")
                                    .css("top", parseInt((i - 1) * 50, 10) + "px")
                                    .width(50).height(50)
                                    .data("row", i).data("col", j)
                                    .appendTo("#grid")
                                    .on("click", cellClick)
                                    .on("mouseenter", {isMatrix: false}, cellMouseEnter)
                                    .on("mouseleave", cellMouseLeave);

                                $(document.createElement("div"))
                                    .addClass("cell cellUnselected")
                                    .css("left", parseInt((j - 1) * 50, 10) + "px")
                                    .css("top", parseInt((i - 1) * 50, 10) + "px")
                                    .text("0")
                                    .appendTo("#grid");
                            }
                        }

                        grid_matrix.height(50 * matrix_size);
                        grid_matrix.width(50 * matrix_size);
                    };

                    function cellClick() {
                        var cell = $(this).next();

                        if (cell.html() == "0") {
                            cell.html("<b>X</b>");
                        } else {
                            cell.html("0");
                        }
                    }

                    function cellMouseEnter(e) {
                        var i = $(this).data("row");
                        var j = $(this).data("col");

                        var x = e.data.isMatrix ? Math.ceil((matrix_size * 50) / matrix_size) : 50;

                        var div = $(document.createElement("div"))
                            .addClass("cellCoordinates cellCoordText")
                            .css("left", parseInt((j - 1) * x, 10) + "px")
                            .css("top", parseInt((i - 1) * x, 10) + "px")
                            .text(i + ", " + j);

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