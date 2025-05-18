// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";


let renderer = new T.WebGLRenderer({preserveDrawingBuffer:true});
renderer.setSize(500, 500);
// @ts-ignore
document.getElementById("div1").appendChild(renderer.domElement);

// student does the rest.

let scene = new T.Scene();

//create ground box for snowman to sit on
let ground = new T.BoxGeometry(10, 0.1, 10);
let groundMat = new T.MeshStandardMaterial({color: "darkgreen", roughness: 0.5, metalness: 0.5});
let groundMesh = new T.Mesh(ground, groundMat);
groundMesh.position.y = -1;
scene.add(groundMesh);

//add three stacked spheres to create a snowman
let bottom = new T.SphereGeometry(1, 20, 20);
let middle = new T.SphereGeometry(0.75, 20, 20);
let top = new T.SphereGeometry(0.5, 20, 20);
let snowMat = new T.MeshStandardMaterial({color: "white", roughness: 0.5, metalness: 0.5});
let bottomMesh = new T.Mesh(bottom, snowMat);
let middleMesh = new T.Mesh(middle, snowMat);
let topMesh = new T.Mesh(top, snowMat);
bottomMesh.position.y = 0;
middleMesh.position.y = 1.25;
topMesh.position.y = 2.25;
scene.add(bottomMesh);
scene.add(middleMesh);
scene.add(topMesh);

//add eyes to the snowman
let eye = new T.SphereGeometry(0.1, 20, 20);
let eyeMat = new T.MeshStandardMaterial({color: "black", roughness: 1, metalness: 0.5});
let leftEye = new T.Mesh(eye, eyeMat);
let rightEye = new T.Mesh(eye, eyeMat);
leftEye.position.set(0.25, 2.5, 0.4);
rightEye.position.set(-0.25, 2.5, 0.4);
scene.add(leftEye);
scene.add(rightEye);

//add a carrot nose to the snowman
let nose = new T.ConeGeometry(0.1, 1, 20);
let noseMat = new T.MeshStandardMaterial({color: "orange", roughness: 0.5, metalness: 0.5});
let noseMesh = new T.Mesh(nose, noseMat);
noseMesh.position.set(0, 2.25, 0.5);
noseMesh.rotation.x = Math.PI/2;
scene.add(noseMesh);

//smile face of 5 "rocks"
let rock = new T.SphereGeometry(0.05, 20, 20);
let rockMat = new T.MeshStandardMaterial({color: "black", roughness: 1, metalness: 0.5});
let rock1 = new T.Mesh(rock, rockMat);
let rock2 = new T.Mesh(rock, rockMat);
let rock3 = new T.Mesh(rock, rockMat);
let rock4 = new T.Mesh(rock, rockMat);
let rock5 = new T.Mesh(rock, rockMat);
rock1.position.set(0.4, 2.2, 0.4);
rock2.position.set(0.2, 2.1, 0.4);
rock3.position.set(0, 2, 0.4);
rock4.position.set(-0.2, 2.1, 0.4);
rock5.position.set(-0.4, 2.2, 0.4);
scene.add(rock1);
scene.add(rock2);
scene.add(rock3);
scene.add(rock4);
scene.add(rock5);

//add snowmans left arm made of sticks down to side
//first segment
let stick = new T.CylinderGeometry(0.05, 0.05, 1, 20);
let stickMat = new T.MeshStandardMaterial({color: "brown", roughness: 0.5, metalness: 0.5});
let leftStick = new T.Mesh(stick, stickMat);
leftStick.position.set(0.75, 1.3, 0);
leftStick.rotation.z = Math.PI/3;
scene.add(leftStick);
//second segment
let stick2 = new T.CylinderGeometry(0.05, 0.05, 1, 20);
let leftStick2 = new T.Mesh(stick2, stickMat);
leftStick2.position.set(1.3, 0.6, 0);
leftStick2.rotation.z = Math.PI/8;
scene.add(leftStick2);

// add his right arm sticking up so he can wave
//first segment
//make in a group for rotation
let rightArm = new T.Group();
let rightStick = new T.Mesh(stick, stickMat);
rightStick.position.set(-0.75, 1.3, 0);
rightStick.rotation.z = -Math.PI/1.5;
rightArm.add(rightStick);
//second segment
let rightStick2 = new T.Mesh(stick2, stickMat);
rightStick2.position.set(-1.3, 2, 0);
rightStick2.rotation.z = -Math.PI/1.1;
rightArm.add(rightStick2);
scene.add(rightArm);


//start second snowman who is melting
let meltBottom = new T.SphereGeometry(1.2, 20, 20);
let meltBottomMesh = new T.Mesh(meltBottom, snowMat);
meltBottomMesh.scale.y = 0.5; // Flatten to make it look melted
meltBottomMesh.position.set(3, -0.5, 0);
scene.add(meltBottomMesh);
let meltMiddle = new T.SphereGeometry(0.6, 20, 20);
let meltMiddleMesh = new T.Mesh(meltMiddle, snowMat);
meltMiddleMesh.position.set(3.2, 0, 0.2);
scene.add(meltMiddleMesh);
let meltTop = new T.SphereGeometry(0.4, 20, 20);
let meltTopMesh = new T.Mesh(meltTop, snowMat);
meltTopMesh.position.set(3.4, 0.3, 0.3);
scene.add(meltTopMesh);

// Eyes sliding off
let meltLeftEye = new T.Mesh(eye, eyeMat);
let meltRightEye = new T.Mesh(eye, eyeMat);
meltLeftEye.position.set(3.5, 0.6, 0.5);
meltRightEye.position.set(3.7, .6, 0.5);
scene.add(meltLeftEye);
scene.add(meltRightEye);

// Nose drooping
let meltNose = new T.Mesh(nose, noseMat);
meltNose.position.set(3.45, 0.3, 0.8);
meltNose.rotation.set(Math.PI / 2, 0.5, 0);
scene.add(meltNose);

// Mouth in a frown on the floor
let meltRock1 = new T.Mesh(rock, rockMat);
let meltRock2 = new T.Mesh(rock, rockMat);
let meltRock3 = new T.Mesh(rock, rockMat);
let meltRock4 = new T.Mesh(rock, rockMat);
let meltRock5 = new T.Mesh(rock, rockMat);
meltRock1.position.set(3.4, -0.9, 1.8);
meltRock2.position.set(3.2, -0.9, 1.7);
meltRock3.position.set(3.0, -0.9, 1.6);
meltRock4.position.set(2.8, -0.9, 1.7);
meltRock5.position.set(2.6, -0.9, 1.8);
scene.add(meltRock1);
scene.add(meltRock2);
scene.add(meltRock3);
scene.add(meltRock4);
scene.add(meltRock5);

// One arm fallen to the ground
let meltStick1 = new T.Mesh(stick, stickMat);
meltStick1.position.set(4.5, -0.9, 0);
meltStick1.rotation.set(Math.PI / 2, 0, 0);
scene.add(meltStick1);

// One arm sticking out weakly
let meltStick2 = new T.Mesh(stick, stickMat);
meltStick2.position.set(3.2, 0.8, 0);
meltStick2.rotation.set(0, 0, -Math.PI / 4);
scene.add(meltStick2);




// Light and camera from 06-06-01.js
let l1 = new T.DirectionalLight();
let l2 = new T.PointLight(0xffffff,1,0,0);
l2.position.set(10, 10, 10);
scene.add(l1);
scene.add(l2);

let camera = new T.PerspectiveCamera();
camera.position.set(0, 10, 10);
camera.lookAt(0, -2, 0);
let movement = new OrbitControls(camera, renderer.domElement);



let lastTimestamp; // undefined to start
function animate(timestamp) {
    let timeDelta = 0.001 * (lastTimestamp ? timestamp - lastTimestamp : 0);
    lastTimestamp = timestamp;

    //make the snowman wave
    rightArm.rotation.z = Math.sin(timestamp/1000)*Math.PI/15;

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);