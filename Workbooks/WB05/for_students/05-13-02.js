// @ts-check
/* jshint -W069, esversion:6 */

import { draggablePoints } from "../libs/CS559/dragPoints.js";

/**
 * drawing function for box 2
 *
 * Use this UI code!
 **/

/* no need for onload - we use defer */


let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");
if (!(context instanceof CanvasRenderingContext2D))
    throw new Error("2d Context is not a CanvasRenderingContext2D");

let thePoints = [
    [150, 150],
    [250, 150],
    [300, 200],
    [250, 250],
    [150, 250],
    [100, 200]
];
 
/**
 * the draw function - which the student will fill in - takes a 
 * timestamp parameter, because it will be passed to requestAnimationFrame
 * 
 * However, in most cases, you can ignore the timestamp
 * 
 * @param {DOMHighResTimeStamp} timestamp 
 */
function draw(timestamp) {
    //clear tha screen
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    //start at the location of the first point which i guess is 100, 100 as of now
    context.moveTo(thePoints[0][0], thePoints[0][1]);
    // for each point draw line to the next point
    for (let i = 1; i < thePoints.length; i++) {
        context.lineTo(thePoints[i][0], thePoints[i][1]);
    }
    context.closePath();
    context.stroke();
    // draw the points for each actual point
    context.fillStyle = "red";
    for (let i = 0; i < thePoints.length; i++) {
        context.beginPath();
        context.arc(thePoints[i][0], thePoints[i][1], 5, 0, 2 * Math.PI);
        context.fill();
    }
}

draggablePoints(canvas, thePoints, draw);

// draw things when everything is ready
window.requestAnimationFrame(draw);

