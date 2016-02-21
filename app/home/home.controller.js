'use strict';

angular.module('myApp.homeController', [])
    .controller('homeController', function ($scope, $rootScope) {
        $rootScope.tileClick = function() {
            if ($rootScope.centerTile.id == this.id)
                alert("Won");
            else
                alert("Lost");

            createGrid(9, 64);
        }
    });