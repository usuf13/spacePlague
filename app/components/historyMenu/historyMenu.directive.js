'use strict';

angular.module('myApp.historyMenu', [])
    .directive('historyMenu', function () {
        return {
            restrict: 'E',
            scope: {
                size: '=size'
            },
            templateUrl: '../app/components/historyMenu/historyMenu.html',
            controller: function () {
                function typeWriter(text, n) {
                    if (n < (text.length)) {
                        $('.test').html(text.substring(0, n+1));
                        n++;
                        setTimeout(function() {
                            typeWriter(text, n)
                        }, 30);
                    }
                }

                $('.start').click(function(e) {
                    e.stopPropagation();

                    var text = $('.test').data('text');

                    typeWriter(text, 0);
                });
            }
        }
    });