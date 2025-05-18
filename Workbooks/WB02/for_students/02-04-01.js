// JavaScript file to be filled in by the student for Box 4-1
// we'll give you something to get started...
export {};
// you should start by getting the canvas
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext('2d');

// then draw the 4 shapes
//pink circle
context.beginPath();
context.arc(45, 45, 30, 0, 2 * Math.PI);
context.fillStyle = "#F8E";
context.strokeStyle = "#846";
context.fill();
context.lineWidth = 5;
context.stroke();

//yellow triangle
context.beginPath();
context.moveTo(45, 135);
context.lineTo(20, 180);
context.lineTo(70, 180);
context.closePath();
context.fillStyle = "sandybrown";
context.strokeStyle = "darkgoldenrod";
context.fill();
context.lineWidth = 5;
context.stroke();

//red capsule
context.beginPath();
context.moveTo(110, 20);
context.bezierCurveTo(80, 20, 80, 70, 110, 70);
context.lineTo(170, 70);
context.bezierCurveTo(200, 70, 200, 20, 170, 20);
context.closePath();
context.fillStyle = "lightpink";
context.strokeStyle = "darkred";
context.fill();
context.lineWidth = 5;
context.stroke();

//black mountains
context.beginPath();
context.moveTo(120, 130);
context.lineTo(145, 150);
context.lineTo(170, 130);
context.lineTo(190, 160);
context.lineTo(190, 180);
context.lineTo(100, 180);
context.lineTo(100, 160);
context.lineTo(120, 130);
context.closePath();
context.fillStyle = "gray";
context.strokeStyle = "black";
context.fill();
context.lineWidth = 5;
context.stroke();
