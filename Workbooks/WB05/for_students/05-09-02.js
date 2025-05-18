// @ts-check
export {};  // null statement to tell VSCode we're doing a module

// draw a picture using curves!

let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");
if (!context)
    throw new Error("Context is null");

//sky  and grass background
context.fillStyle = "lightblue";
context.fillRect(0, 0, canvas.width, canvas.height);
context.fillStyle = "lightgreen";
context.fillRect(0, canvas.height, canvas.width, -100);

// Hay grass stuff
context.fillStyle = "lightyellow";
for (let i = 0; i < 15; i++) {
    let x = Math.random() * canvas.width;
    let y = 290 + Math.random() * 10;
    context.beginPath();
    context.rect(x, y + 25, 10, -75);
    context.fill();
}

// Fluffy sheep body using Bézier curves
context.fillStyle = "white";
context.strokeStyle = "black";
context.lineWidth = 3;
context.beginPath();
context.moveTo(150, 200);

context.beginPath();
context.moveTo(120, 200);
context.bezierCurveTo(100, 150, 160, 120, 200, 130);
context.bezierCurveTo(250, 100, 300, 130, 320, 160);
context.bezierCurveTo(350, 180, 340, 230, 310, 250);
context.bezierCurveTo(280, 270, 220, 280, 180, 260);
context.bezierCurveTo(140, 250, 110, 230, 120, 200);
context.fill();
context.stroke();

//Draw Head
context.beginPath();
context.moveTo(80, 230);
context.bezierCurveTo(50, 210, 40, 160, 70, 140);
context.bezierCurveTo(100, 120, 140, 140, 150, 170);
context.bezierCurveTo(160, 200, 120, 240, 80, 230);
context.fill();
context.stroke();

//Draw Eye
context.fillStyle = "black";
context.beginPath();
context.arc(100, 175, 10, 0, Math.PI * 2);
context.fill();

//Draw Legs
context.fillStyle = "black";
context.beginPath();
context.moveTo(160, 270);
context.lineTo(155, 320);
context.lineTo(170, 320);
context.lineTo(165, 270);
context.fill();
context.stroke();

context.beginPath();
context.moveTo(260, 270);
context.lineTo(255, 320);
context.lineTo(270, 320);
context.lineTo(265, 270);
context.fill();
context.stroke();
