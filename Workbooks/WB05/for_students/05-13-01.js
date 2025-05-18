/**
 * CS559 Spring 2023 Example Solution
 * Written by CS559 course staff
 */

// @ts-check
/* jshint -W069, esversion:6 */

import { runCanvas } from "../libs/CS559/runCanvas.js";

/* no need for onload - we use defer */

/* note how the draw function takes two arguments: the canvas and the time */
/* note that this is DIFFERENT than what we need for requestAnimationFrame */

/**
 * These parameter specifications are used by the type checker to find bugs!
 * @param {HTMLCanvasElement} canvas 
 * @param {Number} time 
 */
function myDraw(canvas, time) {
    // draw a circle divided into 4 colored segments and make it spin
    //make sure the timer goes to 2 seconds instead of 1
    let context = canvas.getContext("2d");
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(time);
    context.beginPath();
    context.moveTo(0, 0);
    context.arc(0, 0, 100, 0, Math.PI / 2);
    context.closePath();
    context.fillStyle = "red";
    context.fill();
    context.beginPath();
    context.moveTo(0, 0);
    context.arc(0, 0, 100, Math.PI / 2, Math.PI);
    context.closePath();
    context.fillStyle = "blue";
    context.fill();
    context.beginPath();
    context.moveTo(0, 0);
    context.arc(0, 0, 100, Math.PI, 3 * Math.PI / 2);
    context.closePath();
    context.fillStyle = "green";
    context.fill();
    context.beginPath();
    context.moveTo(0, 0);
    context.arc(0, 0, 100, 3 * Math.PI / 2, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "yellow";
    context.fill();
    context.restore();
    
}

// note - we can pass "runCanvas" either the name of the canvas, or the canvas element
runCanvas("canvas1",myDraw, 0, false, 0,2,0.1 /* student will want to change the parameters */);
