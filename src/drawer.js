'use strict';

function initApp() {
    const startAt = {x:0,y:0};
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const sliders = document.querySelectorAll('input[type=range]');
    const options = {
        majorRipple: 50,
        minorRipple: 0.15,
        radiusEffect:25,
        angleMultiplier: 1.9,
        scale: 2.5,
        numSegments: 3000
    }

    clearCanvas(ctx);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'

    sliders.forEach(slider => {
        slider.addEventListener('input', e => {
            console.log(e.target.value)
            options[e.target.id] = parseFloat(e.target.value);
            clearCanvas(ctx);
            plotGuilloches(ctx, options);
        });
    });

    plotGuilloches(ctx, options);
}

function clearCanvas(ctx) {
    ctx.fillStyle = '#127';
    ctx.fillRect(0, 0, 800, 600);
}

function drawLine(ctx, cx, cy, x, y) {
    const offsetX = 400;
    const offsetY = 300;
    ctx.moveTo(offsetX + cx, offsetY + cy);
    ctx.lineTo(offsetX + x, offsetY + y);
}

function plotGuilloches(ctx, {minorRipple, majorRipple, radiusEffect, angleMultiplier, scale, numSegments}) {
    ctx.beginPath();
    let theta = 0,
    rp = minorRipple + radiusEffect,
    s = (majorRipple + minorRipple) / minorRipple,
    rR = majorRipple + minorRipple,
    x,
    y,
    px,
    py,
    thetaStep = 2*Math.PI / numSegments;

    let initPos = getPlotCoordinates(rR, angleMultiplier, theta, rp, s);
    x = initPos.x * scale;
    y = initPos.y * scale;
    px = x;
    py = y;

    for (let i = 0; i < numSegments; i++) {
        theta += thetaStep;
        let coords = getPlotCoordinates(rR, angleMultiplier, theta, rp, s);
        x = coords.x * scale;
        y = coords.y * scale;
        drawLine(ctx, px, py, x, y);
        px = x;
        py = y;
    }
    ctx.stroke();
}

function getPlotCoordinates(rR, angleMultiplier, theta, rp, s) {
    const x = rR * Math.cos(angleMultiplier * theta) + rp * Math.cos(s * angleMultiplier * theta);
    const y = rR * Math.sin(angleMultiplier * theta) + rp * Math.sin(s * angleMultiplier * theta);
    return {x, y};
}

initApp()