// @ts-check
export {};

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
const context = canvas.getContext("2d");

const fallingCircles = [];

// Add an event listener for tspace to drop circles
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        // Get the current timestamp
        const timestamp = performance.now();

        // Calculate the positions of the quadcopters
        const quadcopter1X = 300 + 100 * Math.sin(timestamp / 1000);
        const quadcopter1Y = 50 + 100 * Math.cos(timestamp / 1000);
        const quadcopter2X = 300 + 100 * Math.sin(2 * timestamp / 1000);
        const quadcopter2Y = 350 + 100 * Math.cos(timestamp / 1000);

        // Spawn a black circle at the current position of each quadcopter
        spawnFallingCircle(quadcopter1X, quadcopter1Y);
        spawnFallingCircle(quadcopter2X, quadcopter2Y);
    }
});

function spawnFallingCircle(x, y) {
    fallingCircles.push({ x, y });
}

function updateFallingCircles() {
    for (let i = 0; i < fallingCircles.length; i++) {
        fallingCircles[i].y += 2; 
        // Move the circle downwards
        if (fallingCircles[i].y > canvas.height) {
            fallingCircles.splice(i, 1); 
            // Remove the circle if it goes off the canvas
            i--;
        }
    }
}

function drawFallingCircles() {
    context.fillStyle = "black";
    for (const circle of fallingCircles) {
        context.beginPath();
        context.arc(circle.x, circle.y, 5, 0, 2 * Math.PI);
        context.fill();
    }
}

// and you will want to make an animation loop with something like:
/**
 * the animation loop gets a timestamp from requestAnimationFrame
 * 
 * @param {DOMHighResTimeStamp} timestamp 
 */
function Draw(timestamp) {
    // clear the canvas
    context?.clearRect(0, 0, canvas.width, canvas.height);

    //draw a basic blue background
    context.fillStyle = "lightblue";
    context?.fillRect(0, 0, canvas.width, canvas.height);

    //Draw a little green hill in the bottom left corner
    context.fillStyle = "green";
    context?.beginPath();
    context?.moveTo(0, 600);
    context?.bezierCurveTo(0, 400, 200, 400, 200, 600);
    context?.closePath();
    context?.fill();

    //Draw the basic quadcopter flying in a circle
    context?.save();
        context?.translate(300 + 100 * Math.sin(timestamp / 1000), 50 + 100 * Math.cos(timestamp / 1000));
        context?.rotate(-timestamp/1000 + Math.PI/2)
        context?.scale(10,10)
        drawQuadcopter(context, timestamp);
    context?.restore();

    //Draw the more complicated quadcopter flying in an infinity sign
    context?.save();
        context?.translate(300 + 100 * Math.sin(2 * timestamp / 1000), 350 + 100 * Math.cos(timestamp / 1000));
        context?.rotate(Math.atan2(-200 * Math.sin(timestamp / 1000) / 1000, 200 * Math.cos(2 * timestamp / 1000) / 1000 * 2) + Math.PI / 2)
        context?.scale(10,10)
        drawQuadcopter(context, timestamp);
    context?.restore();

    //Draw a guy waving in the bottom left on top of the hill
    context?.save();
        context?.translate(100, 475);
        context?.scale(10,10);
        drawStickFigure(context, timestamp);
    context?.restore();

    // Update and draw falling circles
    updateFallingCircles();
    drawFallingCircles();

    window.requestAnimationFrame(Draw);
}

// and then you would start the loop with:
window.requestAnimationFrame(Draw);

function drawStickFigure(context, timestamp) {
    //draw the non-moving parts of the stick figure
    context.beginPath();
    context.arc(0,-1.5,2,0,2*Math.PI);
    context.moveTo(0,0);
    context.lineTo(0,8);
    context.lineTo(-2,12);
    context.moveTo(0,8);
    context.lineTo(2,12);
    context.moveTo(0,8);
    context.moveTo(0,1);
    context.closePath();
    context.stroke();

    //draw the moving arms in parts of the stick figure
    //left arm
    context.save();
        context.beginPath();
        context.moveTo(0,4);
        context.lineTo(-3,4);
        context.stroke();

        context.save();
            context.translate(-3,4);
            context.rotate(Math.sin(timestamp/1000)/2);
            context.beginPath();
            context.moveTo(0,0);
            context.lineTo(-3,0);
            context.stroke();
            
        context.restore();
    context.restore();

    //right arm
    context.save();
        context.beginPath();
        context.moveTo(0,4);
        context.lineTo(3,4);
        context.stroke();

        context.save();
            context.translate(3,4);
            context.rotate(-Math.sin(timestamp/1000)/2);
            context.beginPath();
            context.moveTo(0,0);
            context.lineTo(3,0);
            context.stroke();
        context.restore();
    context.restore();

}


/**
 * helper function to draw a quadcopter
 * @param {CanvasRenderingContext2D} context
 * @param {DOMHighResTimeStamp} timestamp
 */
function drawQuadcopter(context, timestamp) {
    //Draw the basic quadcopter flying in a circle
    context.save();
        //Draw the body of the quadcopter
        context.beginPath();
        context.fillStyle = "gray";
        context.moveTo(-2,-4);
        context.lineTo(-2,-1);
        context.lineTo(2,-1);
        context.lineTo(2,-4);
        context.lineTo(1,-4);
        context.lineTo(0,-5);
        context.lineTo(-1,-4);
        context.lineTo(-2,-4);
        context.closePath();
        context.stroke();
        context.fill();

        //Draw the left top arm
        context.save();
            context.strokeStyle = "black";
            context.lineWidth = 0.5;
            context.beginPath();
            context.moveTo(-2,-4);
            context.lineTo(-6,-4);
            context.stroke();
            
            //Draw the left top propeller
            context.save();
                context.translate(-6,-4);
                context.rotate(-timestamp/10 + Math.PI/2);
                context.beginPath();
                context.moveTo(0,0);
                context.lineTo(0,1);
                context.moveTo(0,0);
                context.lineTo(1,0);
                context.moveTo(0,0);
                context.lineTo(0,-1);
                context.moveTo(0,0);
                context.lineTo(-1,0);
                context.stroke();
            context.restore();
        context.restore();

        //Draw the right top arm
        context.save();
            context.strokeStyle = "black";
            context.lineWidth = 0.5;
            context.beginPath();
            context.moveTo(2,-4);
            context.lineTo(6,-4);
            context.stroke();

            //Draw the right top propeller
            context.save();
                context.translate(6,-4);
                context.rotate(timestamp/100 + Math.PI/2);
                context.beginPath();
                context.moveTo(0,0);
                context.lineTo(0,1);
                context.moveTo(0,0);
                context.lineTo(1,0);
                context.moveTo(0,0);
                context.lineTo(0,-1);
                context.moveTo(0,0);
                context.lineTo(-1,0);
                context.stroke();
            context.restore();
        context.restore();

        //Draw the left bottom arm
        context.save();
            context.strokeStyle = "black";
            context.lineWidth = 0.5;
            context.beginPath();
            context.moveTo(-2,-1);
            context.lineTo(-6,-1);
            context.stroke();

            //Draw the left bottom propeller
            context.save();
                context.translate(-6,-1);
                context.rotate(-timestamp/50 + Math.PI/2);
                context.beginPath();
                context.moveTo(0,0);
                context.lineTo(0,1);
                context.moveTo(0,0);
                context.lineTo(1,0);
                context.moveTo(0,0);
                context.lineTo(0,-1);
                context.moveTo(0,0);
                context.lineTo(-1,0);
                context.stroke();
            context.restore();
        context.restore();

        //Draw the right bottom arm
        context.save();
            context.strokeStyle = "black";
            context.lineWidth = 0.5;
            context.beginPath();
            context.moveTo(2,-1);
            context.lineTo(6,-1);
            context.stroke();

            //Draw the right bottom propeller
            context.save();
                context.translate(6,-1);
                context.rotate(timestamp/500 + Math.PI/2);
                context.beginPath();
                context.moveTo(0,0);
                context.lineTo(0,1);
                context.moveTo(0,0);
                context.lineTo(1,0);
                context.moveTo(0,0);
                context.lineTo(0,-1);
                context.moveTo(0,0);
                context.lineTo(-1,0);
                context.stroke();
            context.restore();
        context.restore();


    context.restore();
}