/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import * as Simple from "../libs/CS559-Framework/SimpleObjects.js";
import { SimpleGroundPlane } from "../libs/CS559-Framework/GroundPlane.js";

/**
 *
 * @param {GrObject} obj
 * @param {number} [speed=1] - rotations per second
 */
function spinY(obj, speed = 1) {
  obj.stepWorld = function(delta, timeOfDay) {
    obj.objects.forEach(obj => obj.rotateY(((speed * delta) / 1000) * Math.PI));
  };
  return obj;
}

function test() {
  let parentOfCanvas = document.getElementById("div1");
  let world = new GrWorld({ where: parentOfCanvas });

  /**
   * Some Stuff in the world to cast and receive shadows
   */
  // a high object to cast shadows on lower objects
  let gr = new T.Group();
  let mat = new T.MeshStandardMaterial({ color: "blue" });
  let geom = new T.TorusGeometry();
  let tmesh = new T.Mesh(geom, mat);
  tmesh.rotateX(Math.PI / 2);
  tmesh.scale.set(0.5, 0.5, 0.25);
  tmesh.translateX(-2);
  gr.add(tmesh);
  gr.translateY(3);
  let highobj = new GrObject("high obj", gr);
  spinY(highobj);
  world.add(highobj);

  // some low objects to be shadowed - although these
  // should cast shadows on the ground plane
  world.add(spinY(new Simple.GrCube({ x: -3, y: 1 })));
  world.add(spinY(new Simple.GrTorusKnot({ x: 3, y: 1, size: 0.5 })));

  /**
   * Turn on Shadows - this is the student's job in the assignment
   * Remember to:
   * - make a spotlight and turn on its shadows
   * - have objects (including the ground plane) cast / receive shadows
   * - turn on shadows in the renderer
   *
   * it's about 15 lines (with a recursive "loop" to enable shadows for all objects)
   * but you can also just turn things on as you make objects
   */

  // make a spotlight and turn on its shadows
  let light = new T.SpotLight("white", 20);
  light.position.set(0,6,0);
  light.castShadow = true;
  light.angle = Math.PI / 4;
  

  //add light visualization helper (optional)
  let lightHelper = new T.SpotLightHelper(light, "red");
  lightHelper.update();
  light.add(lightHelper);

  let target = new T.Object3D();
  target.position.set(0, 0, 0); // pointing at origin
  world.scene.add(target);
  light.target = target;

  world.scene.add(light);

  //turn on shadows for all objects, both cast and recieve, in the scene with a loop
  world.scene.traverse(function(node) {
    if (node instanceof T.Mesh) {
        // Enable shadow casting and receiving for all meshes
        node.castShadow = true;
        node.receiveShadow = true;
    }
  });

  // turn on shadows in the renderer
  world.renderer.shadowMap.enabled = true;

  world.go();
}
test();

