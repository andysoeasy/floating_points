window.addEventListener('load', () => {

    const cw = 1000;
    const ch = 1000;

    const c = document.querySelector('#drawing');
    const ctx = c.getContext('2d');

    c.width = c.height = cw;

    const rowLength = 10;
    const colLength = 10;
    
    const dots = new Array(rowLength * colLength);

    for (let i = 0; i < dots.length; i++) {
        dots[i] = {
            scale: 0.1,
            r: 250,
            x: (i % rowLength + 0.5) * (cw / rowLength),
            y: (Math.floor(i / rowLength) + 0.5) * (ch / colLength)
        };
    }

    function animateDots() {
        dots.forEach((dot, index) => {
            dot.scale = 1.25 * Math.abs(Math.sin(performance.now() / 3300 + index / 10));
        });
        render();
        requestAnimationFrame(animateDots);
    }

    animateDots();

    ctx.globalCompositeOperation = "xor";

    function render() {
        ctx.clearRect(0, 0, cw, ch);
        dots.forEach((dot, index) => {
            ctx.beginPath();
            ctx.fillStyle = '#C3BEF0';
            ctx.strokeStyle = '#DEFCF9';
            ctx.arc(dot.x, dot.y, dot.r * dot.scale, 0, 2 * Math.PI);
            index % 4 ? ctx.fill() : ctx.stroke();
        });
    }
});
