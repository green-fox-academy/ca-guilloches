'use strict';

const majorRipple = 57;
const minorRipple = 0.13;
const radiusEffect = 25;
const angleMultiplier = 1.25;
const amplitude = 2.5;

function testCanvas() {
    const startAt = {x:0,y:0};
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    drawLineCircle(ctx, 100);
    ctx.stroke();
}

function drawLine(ctx, cx, cy, x, y) {
    let offset = 300;
    ctx.moveTo(offset + cx, offset + cy);
    ctx.lineTo(offset + x, offset + y);
}

function drawLineCircle(ctx, numSegments=60) {
    let theta = 0,
    rp = minorRipple + radiusEffect,
    s = (majorRipple + minorRipple) / minorRipple,
    rR = majorRipple + minorRipple,
    x = 0,
    y = 0,
    px = 0,
    py = 0,
    thetaStep = 2*Math.PI / numSegments;

    for (let i = 0; i < numSegments; i++) {
        x = rR * Math.cos(angleMultiplier * theta) + rp * Math.cos(s * angleMultiplier * theta);
        y = rR * Math.sin(angleMultiplier * theta) + rp * Math.sin(s * angleMultiplier * theta);
        theta += thetaStep;
        x *= amplitude;
        y *= amplitude;
        drawLine(ctx, px, py, x, y);
        px = x;
        py = y;
    }
}

testCanvas()