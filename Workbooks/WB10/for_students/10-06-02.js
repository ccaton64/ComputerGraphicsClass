/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

{
  let mydiv = document.getElementById("div1");

  let world = new GrWorld({ width: mydiv ? 600 : 800, where: mydiv });
  
  let shaderMat = shaderMaterial("./shaders/10-06-02.vs", "./shaders/10-06-02.fs", {
    side: T.DoubleSide,
    uniforms: {
      green:{value: new T.Vector3(0.08235294117647059, 0.2823529411764706, 0.08235294117647059)}, //hex would be 154815
      blue: {value: new T.Vector3(0.047058823529411764, 0.0784313725490196, 0.26666666666666666)}, //hex would be 0c1444
      red: {value: new T.Vector3(1.0, 0.0, 0.0)},
      white: {value: new T.Vector3(0.7, 0.7, 0.7)},
      blueGreen: {value: new T.Vector3(0.0196078431372549, 0.1843137254901961, 0.16862745098039217)}, //hex would be 052f2b
      squares: {value: 4.0},
      thickness: {value: 0.1},
    },
  });

  world.add(new SimpleObjects.GrSphere({ x: -2, y: 1, material: shaderMat }));
  world.add(
    new SimpleObjects.GrSquareSign({ x: 2, y: 1, size: 1, material: shaderMat })
  );

  world.go(); 
}
