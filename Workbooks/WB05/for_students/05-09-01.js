// @ts-check
export {};  // null statement to tell VSCode we're doing a module

// recreate the picture from SVG - but don't use quadratics

let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");


let context = canvas.getContext("2d");
if (!context) throw new Error("2d context no good");
context.strokeStyle = "black";
context.fillStyle ="#CCC"
context.lineWidth = 10;

//d="M150,100 
//Q 150,150  100,150
//Q  50,150   50,100
//Q  50, 50  100, 50
//Q 100,100  150,100
//z"
context?.moveTo(150, 100);
//bezierCurveTo 150, 150
context.bezierCurveTo(150 + ((2/3) * (150 - 150)), 100 + ((2/3) * (150 - 100)), 100 + ((2/3) * (150 - 100)), 150 + ((2/3) * (150 - 150)), 100, 150);
//bezierCurveTo 50, 150
context.bezierCurveTo(100 + ((2/3) * (50 - 100)), 150 + ((2/3) * (150 - 150)), 50 + ((2/3) * (50 - 50)), 150 + ((2/3) * (100 - 150)), 50, 100);
//bezierCurveTo 50, 50
context.bezierCurveTo(50 + ((2/3) * (50 - 50)), 100 + ((2/3) * (50 - 100)), 100 + ((2/3) * (50 - 100)), 50 + ((2/3) * (50 - 50)), 100, 50);
//bezierCurveTo 100, 100
context.bezierCurveTo(100 + ((2/3) * (100 - 100)), 50 + ((2/3) * (100 - 50)), 150 + ((2/3) * (100 - 150)), 100 + ((2/3) * (100 - 100)), 150, 100);
context?.stroke();
context?.fill();