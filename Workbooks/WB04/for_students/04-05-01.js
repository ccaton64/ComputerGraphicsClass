/**
 * 04-05-01.js - a simple JavaScript file that gets loaded with
 * page 5 of Workbook 4 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020, February 2021
 *
 */

/**
 * If you want to read up on JavaScript classes, 
 * see the tutorial on the class website:
 * 
 * https://cs559.github.io/559Tutorials/javascript/oop-in-js-1/
 */
class Boid {
    /**
     * 
     * @param {number} x    - initial X position
     * @param {number} y    - initial Y position
     * @param {number} vx   - initial X velocity
     * @param {number} vy   - initial Y velocity
     * @param {number} framesLeft - frames before undoo color change
     */
    constructor(x, y, vx = 1, vy = 0) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.framesLeft = 0;
        this.frameCounter = 0;
    }
    
    /**
     * Draw the Boid and obstacles
     * Changed to look like a triangle or arrow tip kinda thing
     * obstacles are 4 circles in kinda a diamond shape
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context, framesLeft) {
        //Draw 4 circles to be obstacles, 1 top 2 middle 1 bottom
        context.fillStyle = "black";
        context.beginPath();
        context.arc(canvas.height / 2, canvas.width / 3, 50, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.beginPath();
        context.arc(canvas.height / 4, canvas.width / 2, 50, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.beginPath();
        context.arc( 3 * canvas.height / 4, canvas.width / 2, 50, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.beginPath();
        context.arc(canvas.height / 2, 2 * canvas.width / 3, 50, 0, 2 * Math.PI);
        context.stroke();
        context.fill();

        //boid drawing setup with translate and rotate to get them in the direction facing
        context.save();
        context.translate(this.x, this.y);
        context.rotate(Math.atan2(this.vy, this.vx));
    
        // Draw the boid body
        context.fillStyle = framesLeft > 0 ? "red" : "blue";
        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, 5);
        context.lineTo(-10, -5);
        context.closePath();
        context.fill();
    
        // Calculate leg positions using sine wave for smooth oscillation
        const time = Date.now() / 1000; // current time in seconds
        const leftLegOffset = Math.sin(time * 2 * Math.PI) * 5; // oscillate between -5 and 5
        const rightLegOffset = Math.sin(time * 2 * Math.PI + Math.PI) * 5; // phase offset by PI for opposite movement
    
        // Draw the legs
        // Left legs
        //front leg
        context.fillStyle = "black";
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(12, 7 + leftLegOffset);
        context.stroke();
        context.beginPath();
        context.moveTo(12, 7 + leftLegOffset);
        context.lineTo(6, 12 + leftLegOffset);
        context.stroke();
    
        //back leg
        context.beginPath();
        context.moveTo(-10, 0);
        context.lineTo(2, 7 + leftLegOffset);
        context.stroke();
        context.beginPath();
        context.moveTo(2, 7 + leftLegOffset);
        context.lineTo(-4, 12 + leftLegOffset);
        context.stroke();
    
        // Right legs
        //front leg
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(12, 7 + rightLegOffset);
        context.stroke();
        context.beginPath();
        context.moveTo(12, 7 + rightLegOffset);
        context.lineTo(6, 12 + rightLegOffset);
        context.stroke();
    
        //back leg
        context.beginPath();
        context.moveTo(-10, 0);
        context.lineTo(2, 7 + rightLegOffset);
        context.stroke();
        context.beginPath();
        context.moveTo(2, 7 + rightLegOffset);
        context.lineTo(-4, 12 + rightLegOffset);
        context.stroke();
    
        context.restore();
        this.framesLeft--;
    }
    
    /**
     * Perform the "steering" behavior -
     * This function should update the velocity based on the other
     * members of the flock.
     * It is passed the entire flock (an array of Boids) - that includes
     * "this"!
     * Note: dealing with the boundaries does not need to be handled here
     * (in fact it can't be, since there is no awareness of the canvas)
     * *
     * And remember, (vx,vy) should always be a unit vector!
     * @param {Array<Boid>} flock 
     */
    steer(flock) {
        let pRad = 50; // How far away a group has pull
        let pullStrength = 0.05; // How strongly to pull boids in
        let pushStrength = 0.1; // How strongly to avoid
        let mouseStrength = 0.02; // Strength of mouse attraction
        let maxTurnAngle = Math.PI / 36; // Max turn allowed per frame
    
        let total = 0;
        let avgVx = 0, avgVy = 0;
        let separationX = 0, separationY = 0;
    
        // Get mouse position from the global event listener
        let mouse = window.mousePosition || { x: null, y: null };
    
        flock.forEach(boid => {
            let dX = boid.x - this.x;
            let dY = boid.y - this.y;
            let distance = Math.sqrt(dX * dX + dY * dY);
    
            if (boid !== this && distance < pRad) {
                // Alignment - average velocity of neighbors
                avgVx += boid.vx;
                avgVy += boid.vy;
    
                // Separation - move away from close neighbors
                if (distance < 20) {
                    separationX += (this.x - boid.x) / distance;
                    separationY += (this.y - boid.y) / distance;
                }
    
                total++;
            }
        });
    
        if (total > 0) {
            // get average velocity for alignment
            avgVx /= total;
            avgVy /= total;
        }
    
        // get direction adjustments
        let steerX = 0, steerY = 0;
    
        // Apply alignment steering
        steerX += (avgVx - this.vx) * pullStrength;
        steerY += (avgVy - this.vy) * pullStrength;
    
        // Add in the separation steering to both directions
        steerX += separationX * pushStrength;
        steerY += separationY * pushStrength;
    
        // Apply mouse attraction
        if (mouse.x !== null && mouse.y !== null) {
            let toMouseX = mouse.x - this.x;
            let toMouseY = mouse.y - this.y;
            let mouseDist = Math.sqrt(toMouseX * toMouseX + toMouseY * toMouseY);
            steerX += (toMouseX / mouseDist) * mouseStrength;
            steerY += (toMouseY / mouseDist) * mouseStrength;
        }
    
        // Apply steering while keeping the velocity normalized
        this.vx += steerX;
        this.vy += steerY;
        let speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.vx /= speed;
        this.vy /= speed;
    }
    
}

// global jelper to get the mouse position.
window.mousePosition = { x: null, y: null };
document.addEventListener("mousemove", (event) => {
    let rect = canvas.getBoundingClientRect();
    window.mousePosition.x = event.clientX - rect.left;
    window.mousePosition.y = event.clientY - rect.top;
});


/** the actual main program
 * this used to be inside of a function definition that window.onload
 * was set to - however, now we use defer for loading
 */

 /** @type Array<Boid> */
let boids = [];

let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("flock"));
let context = canvas.getContext("2d");

let speedSlider = /** @type {HTMLInputElement} */ (document.getElementById("speed"));

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    boids.forEach(boid => boid.draw(context, boid.framesLeft));
}

/**
 * Checker for collisions
 * @param {Boid} boid1
 * @param {Boid} boid2
 * @returns {boolean} true if the boids are colliding
 */
function areBoidsColliding(boid1, boid2) {
    //check x and y distance then plug them into distance formula
    let xDist = boid1.x - boid2.x;
    let yDist = boid1.y - boid2.y;
    let distance = Math.sqrt(xDist * xDist + yDist * yDist);
    //check if distance is less than 10 which is roughtly the size of the boid
    return distance < 10;
}

/**
 * Create some initial boids
 * STUDENT: may want to replace this
 */
boids.push(new Boid(100, 100));
boids.push(new Boid(200, 200, -1, 0));
boids.push(new Boid(300, 300, 0, -1));
boids.push(new Boid(400, 400, 0, 1));

/**
 * Handle the buttons
 */
document.getElementById("add").onclick = function () {
    //these are the points where the black circcle obstacles are
    let blockedPoints = [
        [canvas.height / 2, canvas.width /3],
        [canvas.height / 4, canvas.width / 2],
        [3 * canvas.height / 4, canvas.width / 2],
        [canvas.height / 2, 2 * canvas.width / 3]
    ];

    //add ten new boids in a loop
    for (let i = 0; i < 10; i++)
    {
        // choose a random number and let it determine velocity
        let randNum = Math.random();
        if (randNum < 0.25){
            boids.push(new Boid(Math.random() * canvas.width,Math.random() * canvas.height, 0, 1));
        }
        else if (randNum < 0.5){
            boids.push(new Boid(Math.random() * canvas.width,Math.random() * canvas.height, 0, -1));
        }
        else if (randNum < 0.75){
            boids.push(new Boid(Math.random() * canvas.width,Math.random() * canvas.height, 1, 0));
        }
        else {
            boids.push(new Boid(Math.random() * canvas.width,Math.random() * canvas.height, -1, 0));
        }  
        //check if within the blocked points and if so move outside of it
        boids.forEach(boid => {
            blockedPoints.forEach(point => {
                const dx = boid.x - point[0];
                const dy = boid.y - point[1];
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 50) {
                    boid.x += 100;
                    boid.y += 100;
                }
            });
        })
        

    }
};

document.getElementById("clear").onclick = function () {
    // clear the boids array
    boids = [];
};

let lastTime; // will be undefined by default
/**
 * The Actual Execution
 */
function loop(timestamp) {
    //blocked points are the points where the black circles are
    let blockedPoints = [
        [canvas.height / 2, canvas.width /3],
        [canvas.height / 4, canvas.width / 2],
        [3 * canvas.height / 4, canvas.width / 2],
        [canvas.height / 2, 2 * canvas.width / 3]
    ];

    //check if boid is hitting within 50 pixels of the obstacle center
    boids.forEach(boid => {
        blockedPoints.forEach(point => {
            let dx = boid.x - point[0];
            let dy = boid.y - point[1];
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 50) {
                boid.vx *= -1;
                boid.vy *= -1;
                boid.framesLeft = 10;
            }
        });
    });


    const delta = (lastTime ? timestamp - lastTime : 0) * 1000.0 / 60.0;

    // change directions with the steer function TODO
    boids.forEach(boid => boid.steer(boids));

    // Apply random direction change every few frames
    boids.forEach(boid => {
        boid.frameCounter++;
        if (boid.frameCounter % 60 === 0) {
            let angle = (Math.random() - 0.5) * (Math.PI / 8);
            boid.vx = boid.vx * Math.cos(angle) - boid.vy * Math.sin(angle);
            boid.vy = boid.vx * Math.sin(angle) + boid.vy * Math.cos(angle);

            // Normalize the velocity since the change will have altered it
            let length = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy);
            boid.vx /= length;
            boid.vy /= length;
        }
    });

    // move forward
    let speed = Number(speedSlider.value);
    boids.forEach(function (boid) {
        boid.x += boid.vx * speed;
        boid.y += boid.vy * speed;
    });

    //check for collisions
    for (let i = 0; i < boids.length; i++) {
        for (let j = i + 1; j < boids.length; j++) {
            if (areBoidsColliding(boids[i], boids[j])) {
                // reverse velocities
                boids[i].vx *= -1;
                boids[i].vy *= -1;
                boids[j].vx *= -1;
                boids[j].vy *= -1;
                // set framesLeft to indicate a collision
                boids[i].framesLeft = 10;
                boids[j].framesLeft = 10;
            }
        }
    }

    // make sure that we stay on the screen
    boids.forEach(function (boid) {
        //Border bounce code
        if (boid.x >= canvas.width - 10 || boid.x <= 2) {
            boid.vx = -boid.vx;
            boid.framesLeft = 10;
        }
        if (boid.y >= canvas.height - 10 || boid.y <= 2) {
            boid.vy = -boid.vy;
            boid.framesLeft = 10;
        }
        //fix for if boids spawn in the no no zone
        if (boid.x < 2) boid.x = 10;
        if (boid.y < 2) boid.y = 10;
        if (boid.x > canvas.width - 2) boid.x = canvas.width - 10;
        if (boid.y > canvas.height - 2) boid.y = canvas.height - 10;

        if (boid.x < 0) boid.x += canvas.width + 5;
        if (boid.y < 0) boid.y += canvas.height + 5;
    });

    draw();
    window.requestAnimationFrame(loop);
}

// start the loop with the first iteration
window.requestAnimationFrame(loop);


