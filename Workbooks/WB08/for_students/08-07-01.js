/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Wagon } from "./08-07-car.js";


// your vehicles are defined in another file... you should import them
// here


let world = new GrWorld();

// place your vehicles into the world here
function shift(grobj, z, y, x, r) {
    grobj.objects[0].translateZ(z);
    grobj.objects[0].translateY(y);
    grobj.objects[0].translateX(x);
    grobj.objects[0].rotateY(r);
    return grobj;
}

let wagon = shift(new Wagon(), 0, 0, 0, 0);
world.add(wagon);

world.go();

