'use strict';

function initApp() {
    const startAt = {x:0,y:0};
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const rippleSlider = document.querySelector('#majorRipple');

    rippleSlider.addEventListener('input', e => {
        const options = {
            majorRipple: e.target.value,
            minorRipple: 0.15,
            radiusEffect:25,
            angleMultiplier: 1.9,
            amplitude: 2.5,
            numSegments: 1000
        }

        clearCanvas(ctx);
        plotGuilloches(ctx, options);
    });
}

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, 800, 600);
}

function drawLine(ctx, cx, cy, x, y) {
    let offset = 300;
    ctx.moveTo(offset + cx, offset + cy);
    ctx.lineTo(offset + x, offset + y);
}

function plotGuilloches(ctx, {minorRipple, majorRipple, radiusEffect, angleMultiplier, amplitude, numSegments}) {
    ctx.beginPath();
    let theta = 0,
    rp = minorRipple + radiusEffect,
    s = (majorRipple + minorRipple) / minorRipple,
    rR = majorRipple + minorRipple,
    x = 0,
    y = 0,
    px = 0,
    py = 0,
    thetaStep = 2*Math.PI / numSegments;

    let initPos = getPlotCoordinates(rR, angleMultiplier, theta, rp, s);
    x = initPos.x;
    y = initPos.y;
    px = x;
    py = y;

    for (let i = 0; i < numSegments; i++) {
        theta += thetaStep;
        let coords = getPlotCoordinates(rR, angleMultiplier, theta, rp, s);
        x = coords.x * amplitude;
        y = coords.y * amplitude;
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