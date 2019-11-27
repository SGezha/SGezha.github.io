class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lifetime = 0;
    }
}

startAnimation = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", ({ target: { innerWidth, innerHeight } }) => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }, false);

    const points = [];

    const addPoint = (x, y) => {
        const point = new Point(x, y);
        points.push(point);
    };

    document.addEventListener('mousemove', ({
        clientX,
        clientY
    }) => {
        addPoint(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
    }, false);

    const animatePoints = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const duration = 0.5 * (1 * 1000) / 144;

        for (let i = 0; i < points.length; ++i) {
            const point = points[i];
            let lastPoint;

            if (points[i - 1] !== undefined) {
                lastPoint = points[i - 1];
            } else lastPoint = point;

            point.lifetime += 0.2;

            if (point.lifetime > duration) {
                points.shift();
            } else {
                const lifePercent = (point.lifetime / duration);
                const spreadRate = 2 * (1 - lifePercent);

                ctx.lineJoin = 'round';
                ctx.lineWidth = spreadRate;

                const red = Math.floor(100 - (100 * lifePercent));
                const green = Math.floor(200 + (200 * lifePercent));
                const blue = 158;
                ctx.strokeStyle = `rgb(${red},${green},${blue}`;

                ctx.beginPath();

                ctx.moveTo(lastPoint.x, lastPoint.y);
                ctx.lineTo(point.x, point.y);

                ctx.stroke();
                ctx.closePath();
            }
        }
        requestAnimationFrame(animatePoints);
    };
    animatePoints();
}

window.onload = function () {
    startAnimation();
}
