var tile = {
    createTile: function (id, width, height) {
        var radius = 3;
        var padding = 10;

        if (id == null)
            id = Math.random().toString(36).substring(7);

        if (width == null || height == null || width < 15)
            width = height = 64;

        if (width != height)
            height = width;

        var canvas = document.createElement('canvas');
        canvas.setAttribute("name", id);
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        canvas.setAttribute("class", "tile");


        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = "#A0A0A4";
        

        var points = [];
        var coordinates = [padding, width / 2 - radius / 2, width - padding - radius / 2];
        for (var y = 0; y < coordinates.length; y++) {
            for (var x = 0; x < coordinates.length; x++) {
                var point = { x: coordinates[x], y: coordinates[y] };
                points.push(point);

                //fillPoint(ctx, point, 'white');
            }
        }

        var usedPoints = [];

        ctx.beginPath();
        var countPoints = getRandomNumber(5, 7);
        ctx.beginPath();
        ctx.lineWidth = 3;
        for (var index = 0; index < countPoints; index ++)
        {
            var randomIndex = getRandomNumber(0, points.length - 1);

            var point = points[randomIndex];

            var retries = 5;
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
        function fillPoint (ctx, point, color)
        {
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
    }
}