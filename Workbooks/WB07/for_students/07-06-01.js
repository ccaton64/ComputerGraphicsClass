/*jshint esversion: 6 */
// @ts-check

/**
 * Minimal Starter Code for the QuadCopter assignment
 */

import * as T from "../libs/CS559-Three/build/three.module.js";
import { OrbitControls } from "../libs/CS559-Three/examples/jsm/controls/OrbitControls.js";


let renderer = new T.WebGLRenderer({preserveDrawingBuffer:true});
renderer.setSize(600, 400);
document.body.appendChild(renderer.domElement);
renderer.domElement.id = "canvas";

let scene = new T.Scene();
let camera = new T.PerspectiveCamera(
        40,
        renderer.domElement.width / renderer.domElement.height,
        1,
        1000
    );

camera.position.z = 10;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(0, 0, 0);

// since we're animating, add OrbitControls
let controls = new OrbitControls(camera, renderer.domElement);

scene.add(new T.AmbientLight("white", 0.2));

// two lights - both a little off white to give some contrast
let dirLight1 = new T.DirectionalLight(0xf0e0d0, 1);
dirLight1.position.set(1, 1, 0);
scene.add(dirLight1);

let dirLight2 = new T.DirectionalLight(0xd0e0f0, 1);
dirLight2.position.set(-1, 1, -0.2);
scene.add(dirLight2);

// make a ground plane
let groundBox = new T.BoxGeometry(10, 0.1, 10);
let groundMesh = new T.Mesh(
        groundBox,
        new T.MeshStandardMaterial({ color: 0x88b888, roughness: 0.9 })
    );
// put the top of the box at the ground level (0)
groundMesh.position.y = -0.05;
scene.add(groundMesh);

// Helicopter State Variables
let helicopterState = "takeoff"; // takeoff -> fly -> land
let targetPosition = { x: 0, y: 2.5, z: 0 };

// Function to get a random landing position
function getRandomLandingPosition() {
    return {x: (Math.random() - 0.5) * 9, y: 2.5, z: (Math.random() - 0.5) * 9 };
}



// this is the part the student should change
// build a plane
let aircraft = new T.Group();
//rectangular body
let bodyGeom = new T.BoxGeometry(0.5, 1, 0.5);
bodyGeom.translate(0, 0, 0);
bodyGeom.rotateX(Math.PI / 2);
let bodyMat = new T.MeshStandardMaterial({ color: "silver" });
let bodyMesh = new T.Mesh(bodyGeom, bodyMat);
aircraft.add(bodyMesh);

//add the nose cone
let noseGeom = new T.ConeGeometry(0.25, 0.3, 16);
noseGeom.translate(0, .6, 0);
noseGeom.rotateX(Math.PI / 2);
let noseMesh = new T.Mesh(noseGeom, bodyMat);
aircraft.add(noseMesh);

//add the front propeller
let propellers = new T.Group();
let prop1Geom = new T.BoxGeometry(0.05, .75, 0.05);
let prop1Mat = new T.MeshStandardMaterial({ color: "grey" });
let prop1Mesh = new T.Mesh(prop1Geom, prop1Mat);
let prop2Mesh = new T.Mesh(prop1Geom, prop1Mat);
let prop3Mesh = new T.Mesh(prop1Geom, prop1Mat);
let prop4Mesh = new T.Mesh(prop1Geom, prop1Mat);
prop2Mesh.rotateZ(Math.PI / 2);
prop3Mesh.rotateZ(Math.PI);
prop4Mesh.rotateZ(-Math.PI / 2);

propellers.add(prop1Mesh);
propellers.add(prop2Mesh);
propellers.add(prop3Mesh);
propellers.add(prop4Mesh);
propellers.position.set(0, 0, 0.7)
aircraft.add(propellers);

//add the secondary propeller
let propellers2 = new T.Group();
let prop5Mesh = new T.Mesh(prop1Geom, prop1Mat);
let prop6Mesh = new T.Mesh(prop1Geom, prop1Mat);
let prop7Mesh = new T.Mesh(prop1Geom, prop1Mat);
let prop8Mesh = new T.Mesh(prop1Geom, prop1Mat);
prop6Mesh.rotateZ(Math.PI / 2);
prop7Mesh.rotateZ(Math.PI);
prop8Mesh.rotateZ(-Math.PI / 2);

propellers2.add(prop5Mesh);
propellers2.add(prop6Mesh);
propellers2.add(prop7Mesh);
propellers2.add(prop8Mesh);
propellers2.position.set(.8, 0, 0.45)
propellers2.scale.set(0.5, 0.5, 0.5);
aircraft.add(propellers2);

//add the third propeller
let propellers3 = new T.Group();
let prop9Mesh = new T.Mesh(prop1Geom, prop1Mat);
let prop10Mesh = new T.Mesh(prop1Geom, prop1Mat);
let prop11Mesh = new T.Mesh(prop1Geom, prop1Mat);
let prop12Mesh = new T.Mesh(prop1Geom, prop1Mat);
prop10Mesh.rotateZ(Math.PI / 2);
prop11Mesh.rotateZ(Math.PI);
prop12Mesh.rotateZ(-Math.PI / 2);

propellers3.add(prop9Mesh);
propellers3.add(prop10Mesh);
propellers3.add(prop11Mesh);
propellers3.add(prop12Mesh);
propellers3.position.set(-.8, 0, 0.45)
propellers3.scale.set(0.5, 0.5, 0.5);
aircraft.add(propellers3);

//add the wings
let wingGeom = new T.BoxGeometry(2, 0.1, 0.2);
let wingMat = new T.MeshStandardMaterial({ color: "silver" });
let wingMesh = new T.Mesh(wingGeom, wingMat);
wingMesh.position.set(0, 0, .25);
aircraft.add(wingMesh);

//add wing cones
let wingConeGeom = new T.ConeGeometry(0.05, 0.2, 16);
let wingConeMat = new T.MeshStandardMaterial({ color: "silver" });
let wingConeMesh = new T.Mesh(wingConeGeom, wingConeMat);
wingConeMesh.position.set(.8, 0, 0.4);
wingConeMesh.rotateX(Math.PI / 2);
aircraft.add(wingConeMesh);

let wingCone2Mesh = new T.Mesh(wingConeGeom, wingConeMat);
wingCone2Mesh.position.set(-.8, 0, 0.4);
wingCone2Mesh.rotateX(Math.PI / 2);
aircraft.add(wingCone2Mesh);

//add the tail
let tail = new T.Group();
let tail1Geom = new T.BoxGeometry(0.2, 0.2, 1);
let tail1Mat = new T.MeshStandardMaterial({ color: "silver" });
let tail1Mesh = new T.Mesh(tail1Geom, tail1Mat);
tail1Mesh.position.set(0, .1, -0.5);
tail.add(tail1Mesh);
let tail2Geom = new T.BoxGeometry(1, 0.2, 0.2);
let tail2Mesh = new T.Mesh(tail2Geom, tail1Mat);
tail2Mesh.position.set(0, 0.1, -1);
tail.add(tail2Mesh);
aircraft.add(tail);

scene.add(aircraft);
aircraft.position.y = 5;



//Make the radar dish that looks at the aircraft
let radar = new T.Group();

//dish
let dish = new T.Group();
let radarGeom = new T.ConeGeometry(0.5, 0.1, 16);
let radarMat = new T.MeshStandardMaterial({ color: "silver" });
let radarMesh = new T.Mesh(radarGeom, radarMat);
radarMesh.rotateX(Math.PI / 2);
dish.add(radarMesh);

//body
let radarBody = new T.BoxGeometry(0.5, 0.5, 0.5);
let radarBodyMesh = new T.Mesh(radarBody, radarMat);
radarBodyMesh.position.set(0, 0, 0.3);
dish.add(radarBodyMesh);

//antenna
let radarAntenna = new T.CylinderGeometry(0.05, 0.05, 0.5, 16);
let radarAntennaMat = new T.MeshStandardMaterial({ color: "black" });
let radarAntennaMesh = new T.Mesh(radarAntenna, radarAntennaMat);
radarAntennaMesh.position.set(0, 0, -0.1);
radarAntennaMesh.rotateX(Math.PI / 2);
dish.add(radarAntennaMesh);

//blinker
let radarBlinker = new T.SphereGeometry(0.1, 16, 16);
let radarBlinkerMat = new T.MeshStandardMaterial({ color: "red" });
let radarBlinkerMesh = new T.Mesh(radarBlinker, radarBlinkerMat);
radarBlinkerMesh.position.set(0, 0, -0.3);
dish.add(radarBlinkerMesh);

//neck
let radarNeck = new T.CylinderGeometry(0.1, 0.1, 1, 16);
let radarNeckMesh = new T.Mesh(radarNeck, radarMat);
radarNeckMesh.position.set(0, -0.5, 0.5);
radar.add(radarNeckMesh);

//rotate the dish so its angled up
dish.rotateX(Math.PI / 4);
dish.position.set(0, 0, 0.5);

radar.add(dish);
radar.position.set(0, 1, 0);
scene.add(radar);

//duplicate the radar dish for helicopter
let radar2 = new T.Group();
let dish2 = dish.clone();
dish2.rotateY(Math.PI / 4);
let radarNeck2 = radarNeckMesh.clone();
radar2.add(radarNeck2);
radar2.add(dish2);
dish2.rotateX(Math.PI / 4);

radar2.position.set(-4, 1, -4);
scene.add(radar2);


//Create the helecopter that is going to be a ball with a propeller on top and rails on the bottom with a tail and propeller
let helecopter = new T.Group();

//body
let helecopterBody = new T.SphereGeometry(0.5, 16, 16);
let helecopterBodyMat = new T.MeshStandardMaterial({ color: "silver" });
let helecopterBodyMesh = new T.Mesh(helecopterBody, helecopterBodyMat);
helecopter.add(helecopterBodyMesh);
helecopterBodyMesh.scale.setY(0.8);

//propeller cone
let helecopterPropellerCone = new T.ConeGeometry(0.1, 0.2, 16);
let helecopterPropellerConeMat = new T.MeshStandardMaterial({ color: "silver" });
let helecopterPropellerConeMesh = new T.Mesh(helecopterPropellerCone, helecopterPropellerConeMat);
helecopterPropellerConeMesh.position.set(0, 0.4, 0);
helecopter.add(helecopterPropellerConeMesh);

//propeller
let helecopterPropeller = new T.Group();
let helecopterPropellerGeom = new T.BoxGeometry(0.05, .75, 0.05);
let helecopterPropellerMat = new T.MeshStandardMaterial({ color: "grey" });
let helecopterPropellerMesh = new T.Mesh(helecopterPropellerGeom, helecopterPropellerMat);
let helecopterPropeller2Mesh = new T.Mesh(helecopterPropellerGeom, helecopterPropellerMat);
let helecopterPropeller3Mesh = new T.Mesh(helecopterPropellerGeom, helecopterPropellerMat);
let helecopterPropeller4Mesh = new T.Mesh(helecopterPropellerGeom, helecopterPropellerMat);
helecopterPropeller2Mesh.rotateZ(Math.PI / 2);
helecopterPropeller3Mesh.rotateZ(Math.PI);
helecopterPropeller4Mesh.rotateZ(-Math.PI / 2);
helecopterPropeller.add(helecopterPropellerMesh);
helecopterPropeller.add(helecopterPropeller2Mesh);
helecopterPropeller.add(helecopterPropeller3Mesh);
helecopterPropeller.add(helecopterPropeller4Mesh);
helecopterPropeller.rotateX(Math.PI / 2);
helecopterPropeller.position.set(0, 0.5, 0)
helecopter.add(helecopterPropeller);

// landing rails
let helecopterRail = new T.BoxGeometry(0.1, 0.1, 1);
let helecopterRailMat = new T.MeshStandardMaterial({ color: "brown" });
let helecopterRailMesh = new T.Mesh(helecopterRail, helecopterRailMat);
helecopterRailMesh.position.set(0.3, -0.5, 0);
let helecopterRail2Mesh = new T.Mesh(helecopterRail, helecopterRailMat);
helecopterRail2Mesh.position.set(-0.3, -0.5, 0);
helecopter.add(helecopterRailMesh);
helecopter.add(helecopterRail2Mesh);
let connection = new T.CylinderGeometry(0.05, 0.05, 0.3, 16);
let connectionMesh = new T.Mesh(connection, helecopterRailMat);
connectionMesh.position.set(0.3, -0.3, 0.1);
let connection2Mesh = new T.Mesh(connection, helecopterRailMat);
connection2Mesh.position.set(-0.3, -0.3, 0.1);
let connection3Mesh = new T.Mesh(connection, helecopterRailMat);
connection3Mesh.position.set(0.3, -0.3, -0.1);
let connection4Mesh = new T.Mesh(connection, helecopterRailMat);
connection4Mesh.position.set(-0.3, -0.3, -0.1);
helecopter.add(connectionMesh);
helecopter.add(connection2Mesh);
helecopter.add(connection3Mesh);
helecopter.add(connection4Mesh);

//tail
let helecopterTail = new T.BoxGeometry(0.1, 0.25, 1);
let helecopterTailMat = new T.MeshStandardMaterial({ color: "silver" });
let helecopterTailMesh = new T.Mesh(helecopterTail, helecopterTailMat);
helecopterTailMesh.position.set(0, 0, 0.9);
helecopter.add(helecopterTailMesh);

//tail propeller cone
let helecopterTailPropellerCone = new T.ConeGeometry(0.05, 0.2, 16);
let helecopterTailPropellerConeMat = new T.MeshStandardMaterial({ color: "silver" });
let helecopterTailPropellerConeMesh = new T.Mesh(helecopterTailPropellerCone, helecopterTailPropellerConeMat);
helecopterTailPropellerConeMesh.position.set(-0.1, 0, 1.3);
helecopterTailPropellerConeMesh.rotateX(Math.PI / 2);
helecopterTailPropellerConeMesh.rotateZ(Math.PI / 2);
helecopter.add(helecopterTailPropellerConeMesh);

//tail propeller
let helecopterTailPropeller = new T.Group();
let helecopterTailPropellerGeom = new T.BoxGeometry(0.05, .75, 0.05);
let helecopterTailPropellerMat = new T.MeshStandardMaterial({ color: "grey" });
let helecopterTailPropellerMesh = new T.Mesh(helecopterTailPropellerGeom, helecopterTailPropellerMat);
let helecopterTailPropeller2Mesh = new T.Mesh(helecopterTailPropellerGeom, helecopterTailPropellerMat);
let helecopterTailPropeller3Mesh = new T.Mesh(helecopterTailPropellerGeom, helecopterTailPropellerMat);
let helecopterTailPropeller4Mesh = new T.Mesh(helecopterTailPropellerGeom, helecopterTailPropellerMat);
helecopterTailPropeller2Mesh.rotateZ(Math.PI / 2);
helecopterTailPropeller3Mesh.rotateZ(Math.PI);
helecopterTailPropeller4Mesh.rotateZ(-Math.PI / 2);
helecopterTailPropeller.add(helecopterTailPropellerMesh);
helecopterTailPropeller.add(helecopterTailPropeller2Mesh);
helecopterTailPropeller.add(helecopterTailPropeller3Mesh);
helecopterTailPropeller.add(helecopterTailPropeller4Mesh);
helecopterTailPropeller.rotateX(Math.PI / 2);
helecopterTailPropeller.position.set(-0.1, 0, 1.3)
helecopterTailPropeller.scale.set(0.5, 0.5, 0.5);
helecopterTailPropeller.rotateX(Math.PI / 2);
helecopterTailPropeller.rotateY(Math.PI / 2);

helecopter.add(helecopterTailPropeller);





scene.add(helecopter);
helecopter.position.y = 2.5;



// animation loop
function animateLoop(timestamp) {
    //speeds for helicopter
    let speed = 0.02;
    let landingSpeed = 0.01;

    // move in a circle
    let theta = timestamp / 1000;
    let x = 3 * Math.cos(theta);
    let z = 3 * Math.sin(theta);
    aircraft.position.x = x;
    aircraft.position.z = z;

    //make rotation of aircraft group so it faces the direction of motion
    aircraft.rotation.y = -theta;

    //spin propellers 1 and 3
    propellers.rotation.z = theta * 10;
    propellers2.rotation.z = theta * 2;
    propellers3.rotation.z = theta * 50;

    //make radar dish look at the aircraft
    dish.lookAt(-aircraft.position.x, -aircraft.position.y, -aircraft.position.z);

    //spin helecopter propeller
    helecopterPropeller.rotation.z = theta * 10;
    helecopterTailPropeller.rotation.z = theta * 20;


    switch (helicopterState) {
        case "takeoff":
            if (helecopter.position.y < 5) {
                helecopter.position.y += landingSpeed; // Ascend
            } else {
                helicopterState = "fly";
                targetPosition = getRandomLandingPosition();
            }
            break;
            
        case "fly":
            // Smoothly move to target position
            helecopter.position.x += (targetPosition.x - helecopter.position.x) * speed;
            helecopter.position.z += (targetPosition.z - helecopter.position.z) * speed;

            // Check if it reached the target position
            if (Math.abs(helecopter.position.x - targetPosition.x) < 0.1 &&
                Math.abs(helecopter.position.z - targetPosition.z) < 0.1) {
                helicopterState = "land";
            }
            break;

        case "land":
            if (helecopter.position.y > 0.5) {
                helecopter.position.y -= landingSpeed; // Descend
            } else {
                helicopterState = "takeoff"; // Restart cycle
            }
            break;
    }
    
    dish2.lookAt(helecopter.position.x, helecopter.position.y, helecopter.position.z);

    renderer.render(scene, camera);
    window.requestAnimationFrame(animateLoop);
  }
window.requestAnimationFrame(animateLoop);