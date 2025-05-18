/**
 * Starter file for 02-07-01.js - the only exercise of page 7 of Workbook 2
 */

// @ts-check

// Find the canvas and start!
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box1canvas"));
let context = canvas.getContext('2d'); 
// place to ssve all circles
let circles = [];

// Function to draw all circles
function drawCircles() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let circle of circles) {
        context.beginPath();
        context.arc(circle.x, circle.y, 10, 0, 2 * Math.PI);
        context.fillStyle = circle.color;
        context.fill();
        context.stroke();
    }
}

// On click
// Draw and add a circle to the array
// Circle should be initialized to green
canvas.onclick = function(event) {
    // Get mouse position
    const x = event.clientX;
    const y = event.clientY;
    let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
    // make it mouse position in canvas not in window
    const mx = x - box.left;
    const my = y - box.top;

    let found = false;

    // Check if in any of the circles
    for (let i = 0; i < circles.length; i++) {
        if ((Math.abs(circles[i].x - mx) < 10) && (Math.abs(circles[i].y - my) < 10)) {
            // Change the color to red
            circles[i].color = "red";
            found = true;
            break;
        }
    }

    if (!found) {
        // Draw a new circle
        context.beginPath();
        context.arc(mx, my, 10, 0, 2 * Math.PI);
        context.fillStyle = "green";
        context.fill();
        context.stroke();
        // Add circle to array
        circles.push({ x: mx, y: my, color: "green" });
    }

    // Redraw all circles
    drawCircles();
}



// On hover
// If color: green change circle color to yellow
// If color: red change circle color to orange
canvas.onmousemove = function(event) {
    const x = event.clientX;
    const y = event.clientY;
    let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
    const mx = x - box.left;
    const my = y - box.top;

    for (let circle of circles) {
        if ((Math.abs(circle.x - mx) < 10) && (Math.abs(circle.y - my) < 10)) {
            if (circle.color === "green") {
                circle.color = "yellow";
            } else if (circle.color === "red") {
                circle.color = "orange";
            }
        } else {
            if(circle.color == "orange"){
                circle.color = "red";
            }
            if(circle.color == "yellow"){
                circle.color = "green";
            }
        }
    }

    // Redraw all circles
    drawCircles();
}

// On mouse leave
// If color: green change circle color to green
// If color: red change circle color to red
canvas.onmouseleave = function() {
    for (let circle of circles) {
        if(circle.color == "orange"){
            circle.color = "red";
        }
        if(circle.color == "yellow"){
            circle.color = "green";
        }
    }

    // Redraw all circles
    drawCircles();
}