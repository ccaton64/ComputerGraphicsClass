/**
 * 04-04-03.js - a simple JavaScript file that gets loaded with
 * page 4 of Workbook 4 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 *
 */

// @ts-check
/* jshint -W069, esversion:6 */

import * as utilities from "./04-04-utilities.js";

/**
 * TwoDots - a function for the student to write
 * Notice that it gets the two points and the context as arguments
 * This function should apply a transformation
 *
 * This should perform some transformation - you can decide how it works
 *
 * @param {CanvasRenderingContext2D} context
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
function twoDots(context, x1, y1, x2, y2) {
    // Get the angle and distance
    let angle = Math.atan2(y2 - y1, x2 - x1) - Math.PI / 4;
    let distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    let scale = distance / Math.sqrt(10 ** 2 + 10 ** 2);

    let a = scale * Math.cos(angle);
    let b = scale * Math.sin(angle);
    let c = -scale * Math.sin(angle);
    let d = scale * Math.cos(angle);

    let e = x1;
    let f = y1;

    // please leave this line - you should CHANGE the 6 lines above. Add additonal math/logic code as needed.
    context.transform(a, b, c, d, e, f);
}

// start the program running
utilities.setup("canvas1", twoDots);

