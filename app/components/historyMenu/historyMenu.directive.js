'use strict';

angular.module('myApp.historyMenu', [])
    .directive('historyMenu', function () {
        return {
            restrict: 'E',
            scope: {
                size: '=size'
            },
            templateUrl: '../app/components/historyMenu/historyMenu.html',
            controller: function ($rootScope) {
                var $lines = $('.prompt p');
                $lines.hide();
                var lineContents = new Array();

                $rootScope.terminal = function () {

                    var skip = 0;
                    var typeLine = function(idx) {
                        idx == null && (idx = 0);
                        var element = $lines.eq(idx);
                        var content = lineContents[idx];
                        if(typeof content == "undefined") {
                            $('.skip').hide();

                            setTimeout(function () {
                                document.getElementById('history').style.display = "none";
                            }, 1000 * 5);

                            return;
                        }
                        var charIdx = 0;

                        var typeChar = function() {
                            var rand = Math.round(Math.random() * 150);

                            setTimeout(function() {
                                var char = content[charIdx++];
                                element.append(char);
                                if(typeof char !== "undefined")
                                    typeChar();
                                else {
                                    //element.append('<br/><span class="output">' + element.text().slice(9, -1) + '</span>');
                                    element.removeClass('active');
                                    typeLine(++idx);
                                }
                            }, skip ? 0 : rand);
                        }
                        element.addClass('active');
                        typeChar();
                    }

                    $lines.each(function(i) {
                        lineContents[i] = $(this).text();
                        $(this).text('').show();
                    });

                    typeLine();
                }
            }
        }
    });