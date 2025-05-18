// JavaScript file to be filled in by the student for Box 4-2
export {};
// you should start by getting the canvas
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext('2d');

// Set the font properties
context.font = "bold 48px Arial";
context.textBaseline = "top";

// Create a transparent box for each letter
const text = "Homer Simpson";
const xStart = 0; // Starting x position
const yStart = 50; // Starting y position
const padding = 10; // Padding around each letter

//Background box
context.beginPath();
context.moveTo(0, 0);
context.lineTo(0, 500);
context.lineTo(500, 500);
context.lineTo(500, 0);
context.lineTo(0, 0);
context.closePath();
context.fillStyle = "lightblue";
context.fill();

let xPos = xStart;

for (let i = 0; i < text.length; i++) {
    const letter = text[i];
    const metrics = context.measureText(letter);
    const width = metrics.width;
    const height = 48; // Approximate height of the text

    // Draw the transparent box
    context.fillStyle = "rgba(255, 255, 255, 0.5)";
    context.fillRect(xPos, yStart, width + padding, height + padding);

    // Draw the letter
    context.fillStyle = "black";
    context.fillText(letter, xPos + padding / 2, yStart + padding / 2);

    // Update x position for the next letter
    xPos += width + padding;
}



// Head
context.beginPath();
context.moveTo(260, 275); 
context.bezierCurveTo(260, 275, 230, 225, 240, 200);
context.bezierCurveTo(240, 200, 290, 145, 370, 200);
context.bezierCurveTo(360, 205, 390, 180, 375, 225);
context.lineTo(350, 255);
context.bezierCurveTo(350, 235, 450, 275, 350, 285);
context.bezierCurveTo(350, 285, 325, 325, 375, 350);
context.bezierCurveTo(375, 350, 365, 360, 375, 365);
context.bezierCurveTo(375, 365, 325, 385, 275, 365);
context.bezierCurveTo(275, 365, 285, 325, 265, 295);
context.bezierCurveTo(275, 295, 230, 295, 260, 275);
context.closePath();
context.fillStyle = "yellow";
context.fill();
context.stroke();

// Mouth
context.beginPath();
context.moveTo(375, 280); 
context.bezierCurveTo(375, 280, 387, 285, 390, 305);
context.bezierCurveTo(390, 305, 400, 310, 390, 315);
context.bezierCurveTo(390, 315, 365, 317, 360, 315);
context.bezierCurveTo(360, 315, 359, 313, 363, 305);
context.bezierCurveTo(363, 305, 360, 315, 358, 320);
context.moveTo(390, 315);
context.bezierCurveTo(390, 315, 400, 310, 390, 325);
context.bezierCurveTo(390, 325, 388, 329, 380, 335);
context.bezierCurveTo(380, 335, 370, 340, 375, 350);
context.bezierCurveTo(375, 350, 280, 295, 375, 280);

context.fillStyle = "tan";
context.fill();
context.stroke();

// Ear accent
context.beginPath();
context.moveTo(260, 280); 
context.lineTo(275, 285);
context.lineTo(268, 283);
context.lineTo(260, 290);
context.stroke();

// Eyes
context.beginPath();
context.arc(360, 235, 20, 0, 2 * Math.PI); 
context.fillStyle = "white";
context.strokeStyle = "black";
context.fill();
context.stroke();

context.beginPath();
context.arc(330, 240, 20, 0, 2 * Math.PI); 
context.fillStyle = "white";
context.strokeStyle = "black";
context.fill();
context.stroke();

context.beginPath();
context.arc(330, 240, 5, 0, 2 * Math.PI); 
context.fillStyle = "black";
context.fill();
context.stroke();

context.beginPath();
context.arc(360, 235, 5, 0, 2 * Math.PI); 
context.fillStyle = "black";
context.fill();
context.stroke();

// Hair
context.beginPath();
context.moveTo(260, 195);
context.bezierCurveTo(260, 195, 295, 122, 305, 175);
context.stroke();

context.beginPath();
context.moveTo(285, 195);
context.bezierCurveTo(285, 195, 315, 122, 330, 180);
context.stroke();

context.beginPath();
context.moveTo(230, 255);
context.lineTo(240, 245);
context.lineTo(250, 255);
context.lineTo(260, 245);
context.lineTo(270, 255);
context.stroke();

// Duff Beer
context.beginPath();
context.moveTo(50, 200);
context.lineTo(50, 400);
context.lineTo(150, 400);
context.lineTo(150, 200);
context.lineTo(50, 200);
context.fillStyle = "#C4A484";
context.fill();

context.beginPath();
context.moveTo(40, 190);
context.lineTo(40, 410);
context.lineTo(160, 410);
context.lineTo(160, 190);
context.lineTo(40, 190);
context.fillStyle = "rgba(211, 211, 211, 0.5)";
context.fill();
context.stroke();

context.beginPath();
context.moveTo(160, 250);
context.bezierCurveTo(160, 250, 200, 250, 200, 300);
context.bezierCurveTo(200, 300, 200, 350, 160, 350);
context.stroke();