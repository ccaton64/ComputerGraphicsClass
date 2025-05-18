/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { Tent } from "./08-06-buildings.js";
import { Church } from "./08-06-buildings.js";
import { Cactus } from "./08-06-buildings.js";

// your buildings are defined in another file... you should import them
// here

let world = new GrWorld();

function shift(grobj, z, y, x, r) {
    grobj.objects[0].translateZ(z);
    grobj.objects[0].translateY(y);
    grobj.objects[0].translateX(x);
    grobj.objects[0].rotateY(r);
    return grobj;
}

let church = shift(new Church(), 0, 0, -3, 0);
world.add(church);
let tent = shift(new Tent(),2, 0, 3, Math.PI/2);
world.add(tent);
let cactus = shift(new Cactus(), 0, 0, 2, Math.PI/2);
world.add(cactus);

world.go();
