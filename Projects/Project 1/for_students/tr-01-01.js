/*jshint esversion: 6 */
// @ts-check

// these two things are the main UI code for the train
// students learned about them in last week's workbook

import { draggablePoints } from "../libs/CS559/dragPoints.js";
import { RunCanvas } from "../libs/CS559/runCanvas.js";

// this is a utility that adds a checkbox to the page 
// useful for turning features on and off
import { insertElement, makeCheckbox } from "../libs/CS559/inputHelpers.js";


/**
 * Have the array of control points for the track be a
 * "global" (to the module) variable
 *
 * Note: the control points are stored as Arrays of 2 numbers, rather than
 * as "objects" with an x,y. Because we require a Cardinal Spline (interpolating)
 * the track is defined by a list of points.
 *
 * things are set up with an initial track
 */
/** @type Array<number[]> */
let thePoints = [
  [150, 150],
  [150, 450],
  [450, 450],
  [450, 150]
];

// trees for tree points
let treePoints = [];
generateTrees();

// Get the tension from the slider
const tensionSlider = document.getElementById('tension-slider');
// @ts-ignore
const tensionValue = parseFloat(tensionSlider.value);

// You can add an event listener to update the tension value dynamically if needed
tensionSlider?.addEventListener('input', function () {
  // @ts-ignore
  document.getElementById('tension-value').textContent = tensionSlider.value;
});

/**
 * Draw function - this is the meat of the operation
 *
 * It's the main thing that needs to be changed
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} param
 */
function draw(canvas, param) {
  let context = canvas.getContext("2d");
  context?.clearRect(0, 0, canvas.width, canvas.height);

  //Draw the basic light green background
  context?.save();
  // @ts-ignore
  context.fillStyle = "lightgreen";
  context?.fillRect(0, 0, canvas.width, canvas.height);
  context?.restore();


  // Draw control points
  thePoints.forEach(function (pt) {
      context?.beginPath();
      context?.arc(pt[0], pt[1], 5, 0, Math.PI * 2);
      context?.closePath();
      context?.fill();
  });

  // Draw the track
  drawTrack();

  // Draw the trains
  drawTrain(canvas, param, context);
  drawOtherCars(canvas, param, context);

  //Draw the smoke. save and restore to make sure that the alpha doesnt get affected by the smoke alpha idk why this happens but it does
  context?.save();
  drawSmoke(context);
  context?.restore();

  // Draw the trees
  drawTrees();
}
/**
 * Function to draw the track 
 * Mostly the basic track as the other is in more functions
 */
function drawTrack() {
  // Check if simple track is enabled
  // @ts-ignore
  let simpleTrack = document.getElementById("check-simple-track")?.checked;
  // @ts-ignore
  let tension = parseFloat(tensionSlider.value);

  //Draw the basic track. just one curve
  if (simpleTrack) {
      context?.beginPath();
      context?.moveTo(thePoints[0][0], thePoints[0][1]);

      //for loop go through all points of the array and create a curve
      for (let i = 0; i < thePoints.length; i++) {
          let p0 = thePoints[i === 0 ? thePoints.length - 1 : i - 1];
          //p1 is the basic current point
          let p1 = thePoints[i];
          //p2 is the next point in the array also the first control point
          let p2 = thePoints[(i + 1) % thePoints.length];
          //p3 is the point after the next point in the array so last control point
          let p3 = thePoints[(i + 2) % thePoints.length];

          //math to create the curve
          for (let t = 0; t <= 1; t += 0.1) {
              let t2 = t * t;
              let t3 = t2 * t;

              //add + tension * (p2 - p0) to p1 to make the curve affected by tension I think
              let x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);

              //probably do the same thing with tension here
              let y = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);

              //context to draw the curve
              context?.lineTo(x, y);
          }
      }

      context?.closePath();
      context?.stroke();
  } else {
      // Draw the track two parallel curves evenly spaced from the track so that the train moves in the same path as it does in the basic if statement, but visually it is in between two tracks one smaller and one larger
      drawParallelTrack(0.95);
      drawParallelTrack(1.05);
      //Draw the perpendicular wooden rail ties
      drawRailTies();
  }
}

/**
 *  same thing as basic track but with a scale to make two parallel versions of the track a set distance from the basic track
 * 
 * @param {*} scale the scale away from the normal track so that the tracks can be parallel
 */
function drawParallelTrack(scale) {
  context?.beginPath();
  //get the center of the track
  let centerX = thePoints.reduce((sum, pt) => sum + pt[0], 0) / thePoints.length;
  let centerY = thePoints.reduce((sum, pt) => sum + pt[1], 0) / thePoints.length;

  //move to the first point in the array with scale and center
  context?.moveTo(
    centerX + (thePoints[0][0] - centerX) * scale,
    centerY + (thePoints[0][1] - centerY) * scale
  );

  //for loop go through all points of the array and create a curve just like in the basic one
  for (let i = 0; i < thePoints.length; i++) {
      let p0 = thePoints[i === 0 ? thePoints.length - 1 : i - 1];
      let p1 = thePoints[i];
      let p2 = thePoints[(i + 1) % thePoints.length];
      let p3 = thePoints[(i + 2) % thePoints.length];

      for (let t = 0; t <= 1; t += 0.1) {
          let t2 = t * t;
          let t3 = t2 * t;

          //Autocomplete came in clutch here again
          let x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);
          let y = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);

          context?.lineTo(centerX + (x - centerX) * scale, centerY + (y - centerY) * scale);
      }
  }

  context?.closePath();
  context?.stroke();
}


/**
 * Draw the perpendicular wooden rail ties evenly spaced for each segment based on arc length
 */
function drawRailTies() {
  //Wait until Arc Length Parametrization is finished
  //Draw the perpendicular wooden rail ties evenly spaced for each segment based on arc length
  let tieLength = 30;

  // Compute number of ties based on total track length
  // kinda guessing spacing 
  let numTies = Math.floor(totalArcLength / 15);

  context?.save();
  // @ts-ignore
  context.fillStyle = "brown";

  for (let i = 0; i < numTies; i++) {
      let targetArcLength = i * 15;

      // Find the corresponding t-value 
      let t = 0;
      for (let j = 1; j < arcLengths.length; j++) {
          if (arcLengths[j] >= targetArcLength) {
              let alpha = (targetArcLength - arcLengths[j - 1]) / (arcLengths[j] - arcLengths[j - 1]);
              t = (j - 1 + alpha) / arcLengths.length;
              break;
          }
      }

      // Get the position of the tie and set the x and y sowe can use it when drawing the ties
      let tiePos = getTrackPoint(t);
      let x = tiePos.x;
      let y = tiePos.y;

      // Get tangent to the track to compute perpendicular direction for the tie
      let nextPos = getTrackPoint(t + 0.01);
      let dx = nextPos.x - x;
      let dy = nextPos.y - y;
      let length = Math.hypot(dx, dy);

      // Skip ties at sharp turns to avoid overlapping
      if (length === 0) continue;

      let perpX = -dy / length;
      let perpY = dx / length;

      // Compute tie endpoints based on perpendicular direction
      let x1 = x + perpX * tieLength / 2;
      let y1 = y + perpY * tieLength / 2;
      let x2 = x - perpX * tieLength / 2;
      let y2 = y - perpY * tieLength / 2;

      // Draw the ties
      context?.beginPath();
      context?.moveTo(x1, y1);
      context?.lineTo(x2, y2);
      // @ts-ignore
      context.lineWidth = 8;
      // @ts-ignore
      context.strokeStyle = "brown";
      context?.stroke();
    }
  context?.restore();
}

/**
 * draw the rectangle body, light cone, and smoke stack thing 
 * all parameters are just from the premade draw code
 * @param {*} canvas 
 * @param {*} param 
 * @param {*} context 
 */
function drawTrain(canvas, param, context) {

  // Calculations to keep the train moving
  //if arc length is checked, use the arc length parametrization
  //otherwise use the simple parametrization

  // @ts-ignore
  if(document.getElementById("check-arc-length")?.checked) {
    //TODO - Arc Length Parametrization
    //get the distance of the whole track and diveide it into the units based on the 3 second slider so it moves at a consistent pace
    // @ts-ignore
    if (document.getElementById("check-arc-length")?.checked) {
      // Compute total track length
      let totalArcLength = 0;
      let arcLengths = [0];
  
      // Compute arc lengths for each segment of the track using resolution of 100 
      let resolution = 100;
      for (let i = 1; i <= resolution; i++) {
          let t1 = (i - 1) / resolution;
          let t2 = i / resolution;
  
          let p1 = getTrackPoint(t1);
          let p2 = getTrackPoint(t2);
  
          let segmentLength = Math.hypot(p2.x - p1.x, p2.y - p1.y);
          totalArcLength += segmentLength;
          arcLengths.push(totalArcLength);
      }
  
      // Find the corresponding t-value for given time parameter
      //param needs to be divided by how long the slider timer thing is so that the train moves at a consistent pace
      let targetArcLength = (param / 4) * totalArcLength;
      let t = 0;
      for (let i = 1; i < arcLengths.length; i++) {
          if (arcLengths[i] >= targetArcLength) {
              let alpha = (targetArcLength - arcLengths[i - 1]) / (arcLengths[i] - arcLengths[i - 1]);
              t = (i - 1 + alpha) / resolution;
              break;
          }
      }
  
      // Compute train position using the found t-value
      let trainPos = getTrackPoint(t);
      let trainX = trainPos.x;
      let trainY = trainPos.y;
      
      // Compute train direction
      let nextPos = getTrackPoint(t + 0.01);
      let dx = nextPos.x - trainX;
      let dy = nextPos.y - trainY;
      let angle = Math.atan2(dy, dx);
  
      // Draw the train (same as in Simple Parameterization) which is below now
      // Draw Train Rectangle
      context.save();
      context.translate(trainX, trainY);
      context.rotate(angle);
      context.fillStyle = "darkgray";
      context.fillRect(-30, -15, 50, 25);
      context.restore();

      //yellow triangle to show front of train
      context.save();
      context.beginPath();
      context.translate(trainX, trainY);
      context.rotate(angle);
      context.fillStyle = "yellow";
      context.globalAlpha = 0.5;

      //flip triangle 180 degrees
      context.rotate(Math.PI);
      context.moveTo(-10, 3);
      context.lineTo(-80, -20);
      context.lineTo(-80, 20);
      context.closePath();
      context.fill();
      context.restore();
      //black circle on back to show where smoke comes from
      context.save();
      context.translate(trainX, trainY);
      context.rotate(angle);
      context.fillStyle = "black";
      context.beginPath();
      context.arc(-10, -3, 5, 0, Math.PI * 2);
      context.fill();
      context.restore();

      //give train info to smoke so it knows where to be
      smoke(trainX, trainY, angle);
    }
  
    
  }
  else {
    // Simple Parametrization
    let tValue = (param / thePoints.length);
    let segment = Math.floor(tValue * thePoints.length);
    let localT = (tValue * thePoints.length) % 1;

    let p0 = thePoints[(segment - 1 + thePoints.length) % thePoints.length];
    let p1 = thePoints[segment % thePoints.length];
    let p2 = thePoints[(segment + 1) % thePoints.length];
    let p3 = thePoints[(segment + 2) % thePoints.length];

    let t2 = localT * localT;
    let t3 = t2 * localT;

    //similar to track code luckily
    let trainX = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * localT + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);
    let trainY = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * localT + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);
    // Compute for Rotation
    let dx = 0.5 * ((-p0[0] + p2[0]) + (4 * p0[0] - 10 * p1[0] + 8 * p2[0] - 2 * p3[0]) * localT + (-3 * p0[0] + 9 * p1[0] - 9 * p2[0] + 3 * p3[0]) * t2);
    let dy = 0.5 * ((-p0[1] + p2[1]) + (4 * p0[1] - 10 * p1[1] + 8 * p2[1] - 2 * p3[1]) * localT + (-3 * p0[1] + 9 * p1[1] - 9 * p2[1] + 3 * p3[1]) * t2);
    let angle = Math.atan2(dy, dx);

    // Draw Train Rectangle
    context.save();
    context.translate(trainX, trainY);
    context.rotate(angle);
    context.fillStyle = "darkgray";
    context.fillRect(-30, -15, 50, 25);
    context.restore();

    //yellow triangle to show front of train
    context.save();
    context.beginPath();
    context.translate(trainX, trainY);
    context.rotate(angle);
    context.fillStyle = "yellow";
    context.globalAlpha = 0.5;

    //flip triangle 180 degrees
    context.rotate(Math.PI);
    context.moveTo(-10, 3);
    context.lineTo(-80, -20);
    context.lineTo(-80, 20);
    context.closePath();
    context.fill();
    context.restore();
    //black circle on back to show where smoke comes from
    context.save();
    context.translate(trainX, trainY);
    context.rotate(angle);
    context.fillStyle = "black";
    context.beginPath();
    context.arc(-10, -3, 5, 0, Math.PI * 2);
    context.fill();
    context.restore();

    //give train info to smoke so it knows where to be
    smoke(trainX, trainY, angle);
  }
}

//array to hold all smoke particles
let smokeParticles = [];

/**
 * create smoke spots as in locations using train information
 * puch them into the array to be drawn and updated
 * @param {*} trainX xpos of train at this time
 * @param {*} trainY ypos of train at this time
 * @param {*} angle angle of train at this time
 */
function smoke(trainX, trainY, angle) {
  let offsetX = Math.cos(angle) * -20;
  let offsetY = Math.sin(angle) * -20;

  smokeParticles.push({x: trainX + offsetX, y: trainY + offsetY, radius: 10, alpha: 0.5, dx: Math.cos(angle) * -0.5, dy: Math.sin(angle) * -0.5 });
}


/**
 * Function to update and draw smoke particles
 * @param {*} context 
 */
function drawSmoke(context) {
  //go through all smoke particles and draw them
  for (let i = 0; i < smokeParticles.length; i++) {
      let p = smokeParticles[i];
      context.beginPath();
      context.fillStyle = `rgba(300, 300, 300, ${p.alpha})`;
      context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      context.fill();

      // Update smoke position and make it fade
      p.x += p.dx;  
      p.y += p.dy;
      p.alpha -= 0.02; 
      p.radius -= 0.2;

      // Remove smoke if its alpha is close to 0
      if (p.alpha <= 0.1) {
          smokeParticles.splice(i, 1);
          i--;
      }
  }
}

/**
 * Draw the other train cars and make them stay evenly spaced and centered
 * need to be different colors than the engine grrey
 * @param {*} canvas 
 * @param {*} param 
 * @param {*} context 
 */
function drawOtherCars(canvas, param, context) {
  let numCars = 3;
  let carSpacing = 65;

  // Draw each car in the train using the same logic as the engine but with different colors and spacing to make it look like a train
  for (let i = 1; i <= numCars; i++) {
      let carArcLength = (param / 4) * totalArcLength - i * carSpacing;

      // Ensure the car stays on the track loop
      carArcLength = (carArcLength + totalArcLength) % totalArcLength;

      // Find corresponding t-value using a loop
      let t = 0;
      for (let j = 1; j < arcLengths.length; j++) {
          if (arcLengths[j] >= carArcLength) {
              let alpha = (carArcLength - arcLengths[j - 1]) / (arcLengths[j] - arcLengths[j - 1]);
              t = (j - 1 + alpha) / arcLengths.length;
              break;
          }
      }

      // Ensure t stays within valid range
      t = Math.max(0, Math.min(1, t));

      // Get car position
      let carPos = getTrackPoint(t);
      let carX = carPos.x;
      let carY = carPos.y;

      // Get car tangent to the track
      let nextT = (t + 0.01) % 1;
      let nextPos = getTrackPoint(nextT);
      let dx = nextPos.x - carX;
      let dy = nextPos.y - carY;
      let angle = Math.atan2(dy, dx);

      // Draw each car
      context.save();
      context.translate(carX, carY);
      context.rotate(angle);

      // Alternate colors for uniqueness
      let colors = ["red", "blue", "green"];
      context.fillStyle = colors[i % colors.length];
      context.fillRect(-25, -12, 50, 24);

      // Add wheels if i get to this part
      context.fillStyle = "black";
      context.beginPath();
      context.arc(-15, 15, 5, 0, Math.PI * 2);
      context.arc(15, 15, 5, 0, Math.PI * 2);

      context.restore();
  }
}


/**
 * 
 * @param {*} t the t value to get the point of the track at
 * @returns the x and y position of the track at a given t value 
 * copilot was a big help here but I also used the math from the track code
 */
function getTrackPoint(t) {
  //segment is the current segment of the track curve
  let segment = Math.floor(t * thePoints.length);
  //local t is the t value of the current segment of the track curve
  let localT = (t * thePoints.length) % 1;

  //this is all similar to the track code but with the t value of the track curve and the segment of the track curve
  let p0 = thePoints[(segment - 1 + thePoints.length) % thePoints.length];
  let p1 = thePoints[segment % thePoints.length];
  let p2 = thePoints[(segment + 1) % thePoints.length];
  let p3 = thePoints[(segment + 2) % thePoints.length];

  //math to get the x and y position of the track at a given t value
  let t2 = localT * localT;
  let t3 = t2 * localT;
  let x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * localT + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);
  let y = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * localT + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);

  return { x, y };
}

// arc length parametrization stuff 
let totalArcLength = 0;
let arcLengths = [0];

/**
 * Compute the arc lengths for each segment of the track
 */
function computeArcLengths() {
    totalArcLength = 0;
    arcLengths = [0];

    let resolution = 100;
    for (let i = 1; i <= resolution; i++) {
        let t1 = (i - 1) / resolution;
        let t2 = i / resolution;

        let p1 = getTrackPoint(t1);
        let p2 = getTrackPoint(t2);

        //if nothing else i learned how math.hypot works lol
        let segmentLength = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        totalArcLength += segmentLength;
        arcLengths.push(totalArcLength);
    }
}


/**
 * Generate valid tree positions
 */
function generateTrees() {
  let canvas = document.getElementById("canvas1");

    let treeCount = 5;
    let treeSize = 15;
    let x;
    let y;

    if (treePoints.length <  treeCount) {
      for (let i = 0; i < treeCount; i++) {
        let validPosition = false;
        let newTree;

        while (!validPosition) {
            // Generate a random position
            // @ts-ignore
            x = Math.random() * canvas.width;
            // @ts-ignore
            y = Math.random() * canvas.height;
            newTree = [x, y];

            // Check if the tree intersects with the track or train
            if (!intersectsTrack(newTree, treeSize)) {
                treePoints.push(newTree);
                validPosition = true;
            }
        }
      }
    }

    for (let i = 0; i < treeCount; i++) {
      if(intersectsTrack(treePoints[i], treeSize)) {
        treePoints.splice(i, 1);
        generateTrees();
      }
    }

}

/**
 * Check if a tree intersects the track
 * gets pooint and checks distance
 * 
 * @param {*} tree the tree to check
 * @param {*} radius the radius of the tree
 * @returns true if the tree intersects the track, false otherwise
 */
function intersectsTrack(tree, radius) {
    for (let t = 0; t <= 1; t += 0.01) {
        let trackPos = getTrackPoint(t); // Assume this function gives the track position at t
        let distance = Math.hypot(tree[0] - trackPos.x, tree[1] - trackPos.y);
        if (distance < radius + 10) { // 10 is a buffer for track width
            return true;
        }
    }
    return false;
}

/**
 * Draw the trees on the canvas
 */
function drawTrees() {
  let canvas = document.getElementById("canvas1");
    // @ts-ignore
  let context = canvas.getContext("2d");
  for (let i = 0; i < treePoints.length; i++) {
    let x = treePoints[i][0];
    let y = treePoints[i][1];

    // Draw tree trunk
    context?.save();
    context.fillStyle = "brown";
    context?.beginPath();
    context?.rect(x - 5, y, 10, 20);
    context?.fill();
    context?.restore();

    // Draw tree top
    context?.save();
    context.fillStyle = "green";
    context?.beginPath();
    context?.moveTo(x - 10, y);
    context?.lineTo(x + 10, y);
    context?.lineTo(x , y - 20);
    context?.closePath();
    context?.fill();
    context?.restore();
  }
    

}








/**
 * Initialization code - sets up the UI and start the train
 */
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext("2d");

// we need the slider for the draw function, but we need the draw function
// to create the slider - so create a variable and we'll change it later
let slider; // = undefined;

// note: we wrap the draw call so we can pass the right arguments
function wrapDraw() {
    // do modular arithmetic since the end of the track should be the beginning
    draw(canvas, Number(slider.value) % thePoints.length);
}
// create a UI
let runcanvas = new RunCanvas(canvas, wrapDraw);
// now we can connect the draw function correctly
slider = runcanvas.range;

// note: if you add these features, uncomment the lines for the checkboxes
// in your code, you can test if the checkbox is checked by something like:
// document.getElementById("check-simple-track").checked
// in your drawing code
// WARNING: makeCheckbox adds a "check-" to the id of the checkboxes
//
// lines to uncomment to make checkboxes
makeCheckbox("simple-track");
makeCheckbox("arc-length").checked=true;
makeCheckbox("bspline");

// helper function - set the slider to have max = # of control points
function setNumPoints() {
    runcanvas.setupSlider(0, thePoints.length, 0.05);
}

setNumPoints();
runcanvas.setValue(0);

// add the point dragging UI
draggablePoints(canvas, thePoints, wrapDraw, 10, setNumPoints);

let pointUI = draggablePoints(canvas, thePoints, updateTrack);

function updateTrack() {
    computeArcLengths(); // Recalculate the arc-length mapping
    generateTrees(); // Regenerate tree positions
}
