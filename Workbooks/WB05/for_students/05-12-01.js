// @ts-check
/* jshint -W069, esversion:6 */

/**
 * drawing function for box 1
 *
 * draw something.
 **/

// note that checking that canvas is the right type of element tells typescript
// that this is the right type - it's a form of a safe cast 
let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");

let points = [[50,150],[350,150],[350,50],[200,100],[50,50]];

context.beginPath();
context.moveTo(points[1][0], points[1][1]);

let curve = [];
let lerp = (a, b, u) => [a[0] * (1 - u) + b[0] * u, a[1] * (1 - u) + b[1] * u];

for (let i = 0; i < points.length; i++) {
    let pn = points[i];
    let p0 = points[(i + 1) % points.length];
    let p1 = points[(i + 2) % points.length];
    let p2 = points[(i + 3) % points.length];
    //find the derivative of the curve at the start and end
    let s = 0.5;
    let pp0 = [(p1[0] - pn[0]) * s, (p1[1] - pn[1]) * s];
    let pp1 = [(p2[0] - p0[0]) * s, (p2[1] - p0[1]) * s];

    let c0 = p0;
    let c1 = [p0[0] + pp0[0] * (1/3), p0[1] + pp0[1] * (1/3)];
    let c2 = [p1[0] - pp1[0] * (1/3), p1[1] - pp1[1] * (1/3)];
    let c3 = p1;

    //Add lots of points on the curve
    for (let u = 0; u < 1; u += 0.25) {
        let c01 = lerp(c0, c1, u);
        let c12 = lerp(c1, c2, u);
        let c23 = lerp(c2, c3, u);
        let c012 = lerp(c01, c12, u);
        let c123 = lerp(c12, c23, u);
        let c0123 = lerp(c012, c123, u);
        curve.push(c0123);
    }
    context.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], c3[0], c3[1]);
}



// change these so that rather than connecting with straight lines,
// they use cardinal interpolation
// your points should cycle - to make a loop

//context.moveTo(50,150);     // you don't need to change this line

//context.lineTo(350,150);    // this line gets replaced by a bezierCurveTo
//context.lineTo(350,50);     // this line gets replaced by a bezierCurveTo
//context.lineTo(200,100);    // this line gets replaced by a bezierCurveTo
//context.lineTo(50,50);      // this line gets replaced by a bezierCurveTo
//context.lineTo(50,150);     // this line gets replaced by a bezierCurveTo

context.closePath();
context.lineWidth = 3;
context.stroke();

//draw all points in curve[]
context.fillStyle = "green";
context.beginPath();
for (let c of curve) {
    context?.fillRect(c[0] - 4, c[1] - 4, 8, 8);
}
