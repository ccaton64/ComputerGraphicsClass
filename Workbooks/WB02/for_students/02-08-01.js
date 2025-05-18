/**
 * Starter file for 02-08-01.js - the only exercise of page 8 of Workbook 2
 */

// @ts-check

// Find the canvas and start!
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box2canvas"));
let context = canvas.getContext('2d');
let colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "white"];
let fireworks = [];
let explosions = [];
let animationRunning = false;
let isReady = true;

// User clicks mouse, firework shoots from the bottom towards mouse
canvas.addEventListener("click", function(event) {
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;
    let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
    const mx = x - box.left;
    const my = y - box.top;

    let startX = Math.floor(Math.random() * canvas.width);
    let startY = canvas.height; // Start at the bottom of the canvas
    let color = colors[Math.floor(Math.random() * colors.length)];
    // Add firework to fireworks array
    fireworks.push({ x: startX, y: startY, color: color, endX: mx, endY: my });

    // Start the animation loop if it's not already running
    if (!animationRunning) {
        animationRunning = true;
        requestAnimationFrame(animate);
    }
});

// Function to handle the animation
function animate() {
    // Fill the background with black
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < fireworks.length; i++) {
        let firework = fireworks[i];
        context.globalAlpha = 1; // Reset alpha to 1 for fireworks
        context.fillStyle = firework.color;
        context.beginPath();
        context.arc(firework.x, firework.y, 5, 0, 2 * Math.PI);
        context.fill();

        firework.x += (firework.endX - firework.x) / 50;
        firework.y += (firework.endY - firework.y) / 50;

        // Remove the firework if it reaches the target
        if (Math.abs(firework.x - firework.endX) < 1 && Math.abs(firework.y - firework.endY) < 1) {
            fireworks.splice(i, 1);
            i--;
            // Add an explosion of 10 squares in a circle with outward motion
            for (let j = 0; j < 10; j++) {
                let angle = Math.random() * Math.PI * 2;
                let speed = Math.random() * 3 + 1;
                let color = colors[Math.floor(Math.random() * colors.length)];
                explosions.push({ x: firework.endX, y: firework.endY, color: color, angle: angle, speed: speed, alpha: 1 });
            }
        }
    }

    for (let i = 0; i < explosions.length; i++) {
        let explosion = explosions[i];
        context.fillStyle = explosion.color;
        context.globalAlpha = explosion.alpha; // Set the alpha value for explosions
        context.beginPath();
        context.rect(explosion.x, explosion.y, 5, 5);
        context.fill();

        // Move the explosion particles
        explosion.x += Math.cos(explosion.angle) * explosion.speed;
        explosion.y += Math.sin(explosion.angle) * explosion.speed;

        // Slow down the particles and decrease alpha
        explosion.speed -= 0.01;
        explosion.alpha -= 0.01;

        // Remove the particle if it stops moving or becomes fully transparent
        if (explosion.speed <= 0 || explosion.alpha <= 0) {
            explosions.splice(i, 1);
            i--;
        }
    }


    // call random firework ever 1-3 seconds
    if (isReady) {
        isReady = false;
        // copilot said this was the best way to do a timer in here
        //but TODO go look back and try to do delta time
        setTimeout(() => {
            randomFirework();
            isReady = true;
        }, Math.floor(Math.random() * 2000));
    }

        requestAnimationFrame(animate);
    

    
}

function randomFirework() {
    //add a new firework with evry attribute random to the fireworks array
    const mx = Math.floor(Math.random() * canvas.width);
    const my = Math.floor(Math.random() * canvas.height);
    let startX = Math.floor(Math.random() * canvas.width);
    let startY = canvas.height;
    let color = colors[Math.floor(Math.random() * colors.length)];
    fireworks.push({ x: startX, y: startY, color: color, endX: mx, endY: my });
}



