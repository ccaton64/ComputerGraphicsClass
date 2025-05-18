// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
//import { Scene } from "three/src/Three.Core.js";

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });

//add a cube a sphere and a torus knot to the world
let cube = new T.Mesh(new T.BoxGeometry(1, 1, 1), new T.MeshNormalMaterial());
cube.position.set(0, 1, 0);
world.scene.add(cube);
let sphere = new T.Mesh(new T.SphereGeometry(1, 32, 32), new T.MeshNormalMaterial());
sphere.position.set(2, 1, 0);
world.scene.add(sphere);
let torusKnot = new T.Mesh(new T.TorusKnotGeometry(0.5, 0.4, 100, 16), new T.MeshNormalMaterial());
torusKnot.position.set(-2, 1, 0);
world.scene.add(torusKnot);

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

world.go();

