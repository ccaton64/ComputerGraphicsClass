// @ts-check
export {};  // null statement to tell VSCode we're doing a module

// draw the spiral - account for the checkbox and slider
let checkBox = (document.getElementById("connectTheDots"));
let slider = (document.getElementById("numPoints"));

let canvas = (document.getElementById("canvas1"));
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");
if (!(checkBox instanceof HTMLInputElement))
    throw new Error("Checkbox is not HTML Element");
if (!(slider instanceof HTMLInputElement))
    throw new Error("Slider is not HTML Element");

let context = canvas.getContext("2d");

checkBox.addEventListener("change", drawSpiral);
slider.addEventListener("change", drawSpiral);

function drawSpiral() {
    if (!(canvas instanceof HTMLCanvasElement))
        throw new Error("Canvas is not HTML Element");
    if (!(checkBox instanceof HTMLInputElement))
        throw new Error("Checkbox is not HTML Element");
    if (!(slider instanceof HTMLInputElement))
        throw new Error("Slider is not HTML Element");
    if (!context)
        throw new Error("Context is null");

    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    let connected = checkBox.checked;
    let numPoints = parseInt(slider.value);
    let startX = 200;
    let startY = 200;

    //check if conectTheDots is checked
    if (connected) {
        // draw connected spiral with num points and conected between points
        context.beginPath();
        for (let i = 0; i <= numPoints; i++) {
            let u = i / numPoints;
            let x = startX + u * 180 * Math.cos(2 * Math.PI * 4 * u);
            let y = startY + u * 180 * Math.sin(2 * Math.PI * 4 * u);
            context.lineTo(x, y);
        }
        context.stroke();
    } else {
        // draw non-connected spiral that is always 4 cycles around
        for (let i = 0; i <= numPoints; i++) {
            let u = i / numPoints;
            let x = startX + u * 180 * Math.cos(2 * Math.PI * 4 * u);
            let y = startY + u * 180 * Math.sin(2 * Math.PI * 4 * u);
            context.beginPath();
            context.arc(x, y, 2, 0, Math.PI * 2);
            context.fill();
        }
    }
}