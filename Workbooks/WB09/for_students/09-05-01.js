// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });

let loader = new T.CubeTextureLoader();
let texture = loader.load([
    "../textures/skycube/px.png",
    "../textures/skycube/nx.png",
    "../textures/skycube/py.png",
    "../textures/skycube/ny.png",
    "../textures/skycube/pz.png",
    "../textures/skycube/nz.png",
]);

let boxMaterial = new T.MeshBasicMaterial({
    side: T.BackSide,
    map:  texture,
});

world.scene.background = boxMaterial.map;

const material = new T.MeshBasicMaterial( { color: 0xffffff, envMap: texture } );

const geometry = new T.SphereGeometry( 1, 32, 32 );
const sphere = new T.Mesh( geometry, material );

sphere.position.set(0, 1, 0);
world.scene.add( sphere );

world.go();

