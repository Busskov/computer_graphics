const width = 600;
const height = 400;
let scale = 1;

function drawLine(ctx, x0, y0, x1, y1) {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    while (true) {
        ctx.fillRect(x0, y0, 1, 1);

        if (x0 === x1 && y0 === y1) {
            break;
        }
        const e2 = err * 2;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

function draw() {
    const x0 = parseInt(document.getElementById('x-from').value);
    const y0 = parseInt(document.getElementById('y-from').value);
    const x1 = parseInt(document.getElementById('x-to').value);
    const y1 = parseInt(document.getElementById('y-to').value);
    if (x0 >= 0 && x0 < width && y0 >= 0 && y0 < height
        && x1 >= 0 && x1 < width && y1 >= 0 && y1 < height
    ) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        drawLine(ctx, x0, y0, x1, y1);
    }
}

function drawGrid() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 20 * scale;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
}

function zoom(factor) {
    scale *= factor;
    drawGrid();
}

drawGrid();

function zoom_in() {
    zoom(1.2);
}

function zoom_out() {
    zoom(0.8);
}