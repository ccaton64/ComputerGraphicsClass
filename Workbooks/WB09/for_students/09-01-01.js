// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });

// creating a cylinder object and mapping the texture of a redbull can to it
let redbull = new T.Group();
let can = new T.CylinderGeometry(0.5, 0.5, 2, 32);
// Create the texture
let texture = new T.TextureLoader().load("../textures/redbull.jpg");
texture.wrapS = T.RepeatWrapping;
texture.wrapT = T.ClampToEdgeWrapping;
texture.repeat.set(1, 1);
texture.center.set(0.5, 0.5);

let canMaterial = new T.MeshStandardMaterial({
    color: "white",
    metalness: 0.8,
    roughness: 0.2,
    map: texture,
});
texture.repeat.set(1.2, 1);

let canMesh = new T.Mesh(can, canMaterial);

redbull.add(canMesh);
canMesh.position.set(0, 1, 0);

//making the lid of the can with the other texture
let texture1 = new T.TextureLoader().load("../textures/lid.jpg");
let lid = new T.CylinderGeometry(0.5, 0.5, 0.1, 32);
let lidMaterial = new T.MeshStandardMaterial({
    color: "white",
    metalness: 0.8,
    roughness: 0.5,
    map: texture1,
});

let lidMesh = new T.Mesh(lid, lidMaterial);

lidMesh.position.set(0, 2, 0);
redbull.add(lidMesh);

world.scene.add(redbull);
redbull.rotateY(Math.PI);

let light = new T.DirectionalLight("white", 1);
light.position.set(5, 10, 5);
world.scene.add(light);

let ambient = new T.AmbientLight("white", 0.6);
world.scene.add(ambient);


world.go();

