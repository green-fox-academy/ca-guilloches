'use strict';

function testCanvas() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillRect(10,10,300,400);
}

testCanvas()