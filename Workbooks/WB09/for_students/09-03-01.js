// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
//import { Scene, TextureLoader } from "three/src/Three.Core.js";

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });

//set a point light
let light = new T.PointLight("white", 100, 100);
light.position.set(0, 6, 0);
world.scene.add(light);

let  map = new T.TextureLoader().load("../textures/wood.jpg");
let bmap = new T.TextureLoader().load("../textures/woodbump.jpg");
let dmap = new T.TextureLoader().load("../textures/woodD.jpg");

let material = new T.MeshPhongMaterial({
    bumpMap: bmap,
    bumpScale: 1.3,
    displacementMap: dmap,
    displacementScale: 0.1,
    map: map
    });

let geometry = new T.PlaneGeometry(6, 6, 50,50);
let brickWall = new T.Mesh(geometry, material);

world.scene.add(brickWall);
brickWall.position.set(0, 3, 0);

world.go();

