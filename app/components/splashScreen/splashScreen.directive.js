'use strict';

angular.module('myApp.splashScreen', [])
    .directive('splashScreen', function() {
        return {
            restrict: 'E',
            templateUrl: '../app/components/splashScreen/splashScreen.html',
            controller: function () {
                var c = document.getElementById("splashScreen");
                var ctx = c.getContext("2d");

                c.height = window.innerHeight;
                c.width = window.innerWidth;

                var gameName = "SPACE PLAGUE";
                gameName = gameName.split("");

                var font_size = 10;
                var columns = c.width / font_size;

                var drops = [];
                for (var x = 0; x < columns; x++)
                    drops[x] = 1;

                function draw() {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
                    ctx.fillRect(0, 0, c.width, c.height);

                    ctx.fillStyle = "#0F0";
                    ctx.font = font_size + "px arial";

                    for (var i = 0; i < drops.length; i++) {
                        var text = gameName[Math.floor(Math.random() * gameName.length)];
                        ctx.fillText(text, i * font_size, drops[i] * font_size);

                        if (drops[i] * font_size > c.height && Math.random() > 0.975)
                            drops[i] = 0;

                        drops[i]++;
                    }

                    ctx.fillStyle = "#0F0";
                    ctx.font = "60px arial";

                    ctx.textAlign = "center";
                    ctx.fillText("Space Plague",c.width/2, c.height/3);

                }

                setInterval(draw, 33);
            }
        }
    });
