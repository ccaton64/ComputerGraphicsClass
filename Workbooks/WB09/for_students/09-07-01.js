/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

function test() {
  let parentOfCanvas = document.getElementById("div1");
  let world = new GrWorld({ where: parentOfCanvas });

  //adding skybox just like in last examples
  let loader = new T.CubeTextureLoader();
  let texture = loader.load([
      "../textures/skycube/px.png",
      "../textures/skycube/nx.png",
      "../textures/skycube/py.png",
      "../textures/skycube/ny.png",
      "../textures/skycube/pz.png",
      "../textures/skycube/nz.png",
  ]);
  let boxMaterial = new T.MeshBasicMaterial({side: T.BackSide, map:  texture});
  world.scene.background = boxMaterial.map;

  // making GrObject to satisfy requirements of the framework
  class MovingSphere extends GrObject {
    constructor() {
      // Makeing a small red sphere
      let group = new T.Group();
      let mat = new T.MeshStandardMaterial({ color: "red" });
      let sph = new T.Mesh(new T.SphereGeometry(1, 32, 16), mat);
      group.add(sph);
      super("Mover", group);
      this.theta = 0;
    }
    // animate with stepWorld function
    stepWorld(delta, timeOfDay) {
      this.theta += delta / 1000;
      let x = 5 * Math.cos(this.theta);
      let z = 5 * Math.sin(this.theta);
      this.objects[0].position.set(x, 1, z);
    }
  }
  world.add(new MovingSphere());

  //making the sqhere for showing the reflect
  class ReflectiveSphere extends GrObject {
    constructor(world) {
      let group = new T.Group();
      let cubeRenderTarget = new T.WebGLCubeRenderTarget(256, {format: T.RGBAFormat, generateMipmaps: true, minFilter: T.LinearMipmapLinearFilter});
      let cubeCam = new T.CubeCamera(1, 1000, cubeRenderTarget);
      cubeCam.position.set(0, 2, 0);
      group.add(cubeCam);

      // make a reflective material using my new  map
      let chromeMat = new T.MeshBasicMaterial({
        envMap: cubeRenderTarget.texture,
      });
      let chrome = new T.Mesh(new T.SphereGeometry(1, 32, 16), chromeMat);
      chrome.position.set(0, 2, 0);
      group.add(chrome);

      super("Reflector", group);

      this.world = world; 
      this.cam = cubeCam;
      this.mesh = chrome;
    }
    //animate but make sure to hide mesh so it doesnt get caught in loop
    stepWorld(delta, timeOfDay) {
      this.mesh.visible = false;
      this.cam.update(this.world.renderer, this.world.scene);
      this.mesh.visible = true;
    }
  }
  world.add(new ReflectiveSphere(world));
  world.scene.add(new T.AmbientLight(0x666666));
  let light = new T.DirectionalLight(0xffffff, 0.8);
  light.position.set(5, 10, 5);
  world.scene.add(light);

  world.go();
}
test();