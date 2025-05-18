// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

let parentOfCanvas = document.getElementById("div1");
let world = new GrWorld({ where: parentOfCanvas });

// Load the texture (shiny metal bricks)
let map1 = new T.TextureLoader().load("../textures/brickL.png"); // Replace with actual path
let metalMap = new T.TextureLoader().load("../textures/brickD.png");


// Create material that varies metalness across the surface
let material = new T.MeshStandardMaterial({
    map: map1,             // Base color
    metalnessMap: metalMap,
    roughness: 0.5
});

// Create a sphere and add to scene
let sphere = new T.SphereGeometry(0.5, 64, 64);
let mesh = new T.Mesh(sphere, material);
mesh.position.set(0, 1, 0);
world.scene.add(mesh);

// Add spotlight so reflections are obvious
let light = new T.SpotLight("white", 10);
light.position.set(0, 5, 0);
light.target = mesh;
light.angle = Math.PI / 6;
world.scene.add(light);

let ambient = new T.AmbientLight("white", 0.5);
world.scene.add(ambient);

let lastTimestamp;
//add animation to the sphere
function animate(timestamp) {
    let timeDelta = 0.002 * (lastTimestamp ? timestamp - lastTimestamp : 0);
    lastTimestamp = timestamp;
  
    //make the sphere rotate
    mesh.rotation.x += timeDelta * 0.5;
    mesh.rotation.y += timeDelta * 0.5;
  
    world.renderer.render(world.scene, world.camera);
    window.requestAnimationFrame(animate);
  }
  // @@Snippet:end
  
  window.requestAnimationFrame(animate);

world.go();
