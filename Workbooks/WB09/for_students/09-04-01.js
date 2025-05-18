// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

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

//put a big sphere around the scene with a texture on the inside
let loader = new T.TextureLoader();
let texture = loader.load("../textures/skybox.jpg", function (texture) {
    boxMaterial.map = texture;
    boxMaterial.needsUpdate = true;
});
let boxGeometry = new T.SphereGeometry(10, 60, 40);
let boxMaterial = new T.MeshBasicMaterial({
    side: T.BackSide,
    map:  texture,
});

let box = new T.Mesh(boxGeometry, boxMaterial);
world.scene.add(box);

world.go();

