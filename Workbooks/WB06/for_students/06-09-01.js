// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";
import { setupBasicScene } from "./06-09-01-helpers.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

// students can use the object loader
// uncomment this if necessary
// import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

/** Setup the window */
/** @type{number} */
let wid = 670; // window.innerWidth;
/** @type{number} */
let ht = 500; // window.innerHeight;
/** @type{T.WebGLRenderer} */
let renderer = new T.WebGLRenderer({preserveDrawingBuffer:true});
renderer.setSize(wid, ht);
renderer.shadowMap.enabled = true;

let loader = new OBJLoader();
document.getElementById("museum_area").appendChild(renderer.domElement);
renderer.domElement.id = "canvas";

/* setupBasicScene creates a scene and puts the pedestals in place */
/** @type{T.Scene} */
let scene = setupBasicScene();

// Here, we add a basic, simple first object to the museum.
/**@type{T.Material} */
let material = new T.MeshPhongMaterial({
  color: "#00aa00",
  shininess: 15,
  specular: "#00ff00",
});
/**@type{T.BufferGeometry} */
let geometry = new T.BoxGeometry(0.5, 0.5, 0.5);
/**@type{T.Mesh} */
let cube = new T.Mesh(geometry, material);
cube.position.set(2, 1.35, 2);
cube.rotation.set(Math.PI / 4, 0, Math.PI / 4);
cube.castShadow = true;

// TODO: You need to create three more objects, and place them on pedestals.
//Import teapot frim obj folder
let teapot = await loader.loadAsync("./objects/07-teapot.obj");
teapot.position.set(-2, 1.35, 2);
teapot.scale.set(0.025, 0.025, 0.025);
scene.add(teapot);
teapot.traverse(obj => {
        if (obj instanceof T.Mesh) {
            obj.material = new T.MeshStandardMaterial({color:"lightblue"});
        }
    });
  teapot.castShadow = true;

//use snowman from previous assignment
let snowMat = new T.MeshStandardMaterial({color: "white", roughness: 0.5, metalness: 0.5});
let blackMat = new T.MeshStandardMaterial({color: "black", roughness: 1, metalness: 0.5});
let eye = new T.SphereGeometry(0.1, 20, 20);
let rock = new T.SphereGeometry(0.05, 20, 20);
let nose = new T.ConeGeometry(0.1, 1, 20);
let noseMat = new T.MeshStandardMaterial({color: "orange", roughness: 0.5, metalness: 0.5});
let stick = new T.CylinderGeometry(0.05, 0.05, 1, 20);
let stickMat = new T.MeshStandardMaterial({color: "brown", roughness: 0.5, metalness: 0.5});
let snowman = new T.Group();
let meltBottom = new T.SphereGeometry(1.2, 20, 20);
let meltBottomMesh = new T.Mesh(meltBottom, snowMat);
meltBottomMesh.scale.y = 0.5; // Flatten to make it look melted
meltBottomMesh.position.set(3, -0.5, 0);
snowman.add(meltBottomMesh);
let meltMiddle = new T.SphereGeometry(0.6, 20, 20);
let meltMiddleMesh = new T.Mesh(meltMiddle, snowMat);
meltMiddleMesh.position.set(3.2, 0, 0.2);
snowman.add(meltMiddleMesh);
let meltTop = new T.SphereGeometry(0.4, 20, 20);
let meltTopMesh = new T.Mesh(meltTop, snowMat);
meltTopMesh.position.set(3.4, 0.3, 0.3);
snowman.add(meltTopMesh);
let meltLeftEye = new T.Mesh(eye, blackMat);
let meltRightEye = new T.Mesh(eye, blackMat);
meltLeftEye.position.set(3.5, 0.6, 0.5);
meltRightEye.position.set(3.7, .6, 0.5);
snowman.add(meltLeftEye);
snowman.add(meltRightEye);
let meltNose = new T.Mesh(nose, noseMat);
meltNose.position.set(3.45, 0.3, 0.8);
meltNose.rotation.set(Math.PI / 2, 0.5, 0);
snowman.add(meltNose);
let meltRock1 = new T.Mesh(rock, blackMat);
let meltRock2 = new T.Mesh(rock, blackMat);
let meltRock3 = new T.Mesh(rock, blackMat);
let meltRock4 = new T.Mesh(rock, blackMat);
let meltRock5 = new T.Mesh(rock, blackMat);
meltRock1.position.set(3.4, -0.9, 1.8);
meltRock2.position.set(3.2, -0.9, 1.7);
meltRock3.position.set(3.0, -0.9, 1.6);
meltRock4.position.set(2.8, -0.9, 1.7);
meltRock5.position.set(2.6, -0.9, 1.8);
snowman.add(meltRock1);
snowman.add(meltRock2);
snowman.add(meltRock3);
snowman.add(meltRock4);
snowman.add(meltRock5);
let meltStick1 = new T.Mesh(stick, stickMat);
meltStick1.position.set(4.5, -0.9, 0);
meltStick1.rotation.set(Math.PI / 2, 0, 0);
snowman.add(meltStick1);
let meltStick2 = new T.Mesh(stick, stickMat);
meltStick2.position.set(3.2, 0.8, 0);
meltStick2.rotation.set(0, 0, -Math.PI / 4);
snowman.add(meltStick2);

snowman.position.set(-3.25, 1.35, -2);
snowman.scale.set(0.4, 0.4, 0.4);
snowman.castShadow = true;
scene.add(snowman);

//create a tree
let tree = new T.Group();
let trunk = new T.CylinderGeometry(0.1, 0.1, 1, 20);
let trunkMat = new T.MeshStandardMaterial({color: "brown", roughness: 1, metalness: 0});
let trunkMesh = new T.Mesh(trunk, trunkMat);
tree.add(trunkMesh);
let leaves = new T.ConeGeometry(0.5, 1, 20);
let leavesMat = new T.MeshStandardMaterial({color: "green", roughness: 0.5, metalness: 0.5});
let leavesMesh = new T.Mesh(leaves, leavesMat);
leavesMesh.position.set(0, 0.5, 0);
tree.add(leavesMesh);

tree.position.set(2, 1.7, -2);
scene.add(tree);

//array of leaf colors
let leafColors = ["green", "yellow", "orange", "red", "brown", "black"];

/* put a spotlight on the first object */
/**@type{T.SpotLight} */
let spotlight_1 = new T.SpotLight(0xaaaaff, 2);
spotlight_1.angle = Math.PI / 8;
spotlight_1.position.set(2, 3, 2);
spotlight_1.target = cube;
scene.add(spotlight_1);

// TODO: You need to place the lights.
let spotlight_2 = new T.SpotLight(0xaaaaff, 2);
spotlight_2.angle = Math.PI / 8;
spotlight_2.position.set(-2, 3, 2);
spotlight_2.target = teapot;
scene.add(spotlight_2);

let target = new T.Object3D();
target.position.set(-2, 0, -2);
let spotlight_3 = new T.SpotLight(0xaaaaff, 2);
spotlight_3.angle = Math.PI / 8;
spotlight_3.position.set(-2, 3, -2);
spotlight_3.target = target;
scene.add(spotlight_3);

let spotlight_4 = new T.SpotLight(0xaaaaff, 2);
spotlight_4.angle = Math.PI / 8;
spotlight_4.position.set(2, 3, -2);
spotlight_4.target = tree;
scene.add(spotlight_4);

let spotlightHelper1 = new T.SpotLightHelper(spotlight_1);
scene.add(spotlightHelper1);

let spotlightHelper2 = new T.SpotLightHelper(spotlight_2);
scene.add(spotlightHelper2);

let spotlightHelper3 = new T.SpotLightHelper(spotlight_3);
scene.add(spotlightHelper3);

let spotlightHelper4 = new T.SpotLightHelper(spotlight_4);
scene.add(spotlightHelper4);

/** create a "main camera" */
/** @type{T.PerspectiveCamera} */
let main_camera = new T.PerspectiveCamera(60, wid / ht, 1, 100);
main_camera.position.set(0, 4, 6);
main_camera.rotation.set(-0.5, 0, 0);

/** this will be the "current camera" - we will switch when a button is pressed */
let active_camera = main_camera;

// TODO: You need to place these cameras.
let camera_1 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
camera_1.position.y = 2;
camera_1.lookAt(teapot.position);
let camera_2 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
camera_2.position.y = 2;
camera_2.lookAt(target.position.x, target.position.y + 1, target.position.z);
let camera_3 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
camera_3.position.y = 2;
camera_3.lookAt(tree.position);
let camera_4 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
camera_4.position.y = 2;
camera_4.lookAt(cube.position);
scene.add(cube);

// add orbit controls - but only to the main camera
let controls = new OrbitControls(main_camera, renderer.domElement);

/** Tie the buttons to the cameras */
function setupCamButton(name, camera) {
  const button = document.getElementById(name);
  if (!(button instanceof HTMLButtonElement))
    throw new Error(`Button ${name} doesn't exist`);
  button.onclick = function () {
    active_camera = camera;
    renderer.render(scene, active_camera);
  };
}
setupCamButton("main_cam", main_camera);
setupCamButton("cam_1", camera_1);
setupCamButton("cam_2", camera_2);
setupCamButton("cam_3", camera_3);
setupCamButton("cam_4", camera_4);

// finally, draw the scene. Also, add animation.
renderer.render(scene, active_camera);

let lastTimestamp; // undefined to start

function animate(timestamp) {
  // Convert time change from milliseconds to seconds
  let timeDelta = 0.001 * (lastTimestamp ? timestamp - lastTimestamp : 0);
  lastTimestamp = timestamp;

  // Animate the cube (basic object)
  cube.rotateOnWorldAxis(new T.Vector3(0, 1, 0), timeDelta);

  // TODO: animate your objects
  //make teaphot bounce and spin
  teapot.position.y = Math.abs(1.9 + (0.25 * Math.sin(timestamp/1000)));
  teapot.rotation.z += 0.01;

  //make snowman bounce and squash
  snowman.position.y = Math.abs(1.75 - (0.4 * Math.sin(timestamp/1000)));
  snowman.scale.y = 0.3 + 0.2 * Math.sin(timestamp/1000);
  
  //make tree bounce and change leaves color
  tree.position.y = Math.abs(1.7 + (0.25 * Math.cos(timestamp/1000)));
  for (let i = 0; i < leafColors.length; i++){
    if (timestamp % 6000 < 1000){
      leavesMat.color.set(leafColors[0]);
    }
    else if (timestamp % 6000 < 2000){
      leavesMat.color.set(leafColors[1]);
    }
    else if (timestamp % 6000 < 3000){
      leavesMat.color.set(leafColors[2]);
    }
    else if (timestamp % 6000 < 4000){
      leavesMat.color.set(leafColors[3]);
    }
    else if (timestamp % 6000 < 5000){
      leavesMat.color.set(leafColors[4]);
    }
    else if (timestamp % 6000 < 6000){
      leavesMat.color.set(leafColors[5]);
    }
  }
  

  // draw and loop
  renderer.render(scene, active_camera);
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);
