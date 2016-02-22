var tile = {
    createTile: function (level, width, height, id) {
        var radius = 3;
        var padding = 10;

        if (id == null)
            id = Math.random().toString(36).substring(7);

        if (width == null || height == null || width < 15)
            width = height = 64;

        if (width != height)
            height = width;

        var canvas = document.createElement('canvas');
        canvas.setAttribute("id", id);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        tileLevelEffects(canvas, level);

        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = "#A0A0A4";

        var points = [];
        var coordinates = [padding, width / 2 - radius / 2, width - padding - radius / 2];
        for (var y = 0; y < coordinates.length; y++) {
            for (var x = 0; x < coordinates.length; x++) {
                var point = { x: coordinates[x], y: coordinates[y] };
                points.push(point);
            }
        }

        var usedPoints = [];

        ctx.beginPath();
        var countPoints = getRandomNumber(5, 7);
        ctx.beginPath();
        ctx.lineWidth = 3;
        for (var index = 0; index < countPoints; index++) {
            var randomIndex = getRandomNumber(0, points.length - 1);

            var point = points[randomIndex];

            var retries = 10;
            while (usedPoints.indexOf(point) > -1 && retries > 0) {
                point = points[randomIndex];
                retries--;
            }

            usedPoints.push(point);

            if (index == 0)
                ctx.moveTo(point.x, point.y);
            else
                ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
        ctx.closePath();

        ctx.lineWidth = 1;
        for (var index = 0; index < points.length; index++) {
            var point = points[index];

            if (usedPoints.indexOf(point) > -1)
                fillPoint(ctx, point, '#A0A0A4');
            else
                fillPoint(ctx, point, 'white');
        }

        return canvas;



        //private functions
        function fillPoint(ctx, point, color) {
            ctx.beginPath();
            ctx.arc(point.x, point.y, radius, 0, Math.PI * 2, true);
            ctx.fillStyle = color;
            ctx.fill();

            ctx.stroke();
            ctx.closePath();
        }

        function getRandomNumber(min, max) {
            return (Math.random() * (max - min) + min).toFixed(0);
        }
    },
    copyTile: function (sourceCanvas) {
        var canvas = document.createElement('canvas');
        canvas.setAttribute("id", sourceCanvas.getAttribute('id'));
        canvas.setAttribute("width", sourceCanvas.getAttribute('width'));
        canvas.setAttribute("height", sourceCanvas.getAttribute('height'));
        canvas.setAttribute("class", "tile");
        canvas.setAttribute("style", "");
        //canvas.setAttribute("class", sourceCanvas.getAttribute('class'));
        //canvas.setAttribute("style", sourceCanvas.getAttribute('style'));

        var destCtx = canvas.getContext('2d');
        destCtx.drawImage(sourceCanvas, 0, 0);

        return canvas;
    },
    setLevel: function (sourceCanvas, level) {
        tileLevelEffects(sourceCanvas, level)
    }
}

var tileLevelEffects = function (sourceCanvas, level) {
    var acceptLevels = [1, 2, 3, 4, 5];
    if (acceptLevels.indexOf(level) == -1)
        level = 1;

    switch (level) {
        case 1:
            sourceCanvas.setAttribute("class", "tile");
            sourceCanvas.setAttribute("style", "");
            break;
        case 2:
            sourceCanvas.setAttribute("style", "background-color:" + getRandomRgbColor() + ";");
            sourceCanvas.setAttribute("class", "tile tileLevel2");
            break;
        case 3:
            var style = "background-color:" + getRandomRgbColor() + ";" +
                "-webkit-animation: level3 ease-in-out " + random(1, 4) + "s infinite alternate;" +
                "-moz-animation: level3 ease-in-out " + random(1.5, 3) + "s infinite alternate;";

            sourceCanvas.setAttribute("style", style);
            break;
        case 4:
            var style = "background-color:" + getRandomRgbColor() + ";" +
                "left: " + random(1, 5) + "px;" +
                "-webkit-animation: level4 ease-in-out " + random(1, 4) + "s infinite alternate;" +
                "-moz-animation: level4 ease-in-out " + random(1.5, 3) + "s infinite alternate;";

            sourceCanvas.setAttribute("style", style);
            break;
        case 5:
            var level = "level5";
            if (Math.random() < 0.5)
                level = "level5Counterclockwise";

            var style = "background-color:" + getRandomRgbColor() + ";" +
                "left: " + random(1, 5) + "px;" +
                "-webkit-animation: " + level + " ease-in-out " + random(1, 4) + "s infinite alternate;" +
                "-moz-animation: " + level + " ease-in-out " + random(1.5, 3) + "s infinite alternate;";

            sourceCanvas.setAttribute("style", style);
            break;
    }

    function getRandomRgbColor(){
        return "rgb(" + random(1, 256) + "," + random(1, 256) + "," + random(1, 256) + ")";
    }

    function random (max, min){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}