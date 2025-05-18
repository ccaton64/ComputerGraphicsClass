/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559/inputHelpers.js";

const s2 = Math.sqrt(2) / 2;

/*
 * Define your 3 objects here. If the objects fit inside +/- 1,
 * the world code below will place them nicely.
 * Otherwise, you need to modify the world code below to make the
 * world bigger and space the objects out differently.
 */

class Object1 extends GrObject {
  constructor() {
    let geometry = new T.BufferGeometry();
    const vertices = new Float32Array( [
      -1, 0, 1,   // 0
      1, 0, 1,    // 1
      -1, 0, -1,  // 2
      1, 0, -1,   // 3

      0, 2, 0,   // 4
      -1, 0, -1,   // 5
      1, 0, -1,   // 6

      0, 2, 0,   // 7
      -1, 0, 1,   // 8
      1, 0, 1,   // 9
      
      0, 2, 0,   // 10
      -1, 0, -1,   // 11
      -1, 0, 1,   // 12

      0, 2, 0,   // 13
      1, 0, -1,   // 14
      1, 0, 1,   // 15
    ]);  
    geometry.setAttribute('position',new T.BufferAttribute(vertices,3));
    geometry.setIndex([
      0,2,1, 1,2,3,  //Bottom face
      4,6,5, 7,8,9,   //Front and back faces
      10,11,12, 13,15,14 //Left and right faces
    ]);

    geometry.computeVertexNormals();
    const colors = new Float32Array( [
      0,0,0,
      0,0,0,
      0,0,0,
      0,0,0,

      1,0,0,
      1,0,0,
      1,0,0,
      
      0,1,0,
      0,1,0,
      0,1,0,

      0,0,1,
      0,0,1,
      0,0,1,

      1,1,1,
      1,1,1,
      1,1,1

    ]);

    geometry.setAttribute("color",new T.BufferAttribute(colors,3));
  
        let material = new T.MeshStandardMaterial({
          roughness: 0.75,
          vertexColors: true
        });
        let mesh = new T.Mesh(geometry, material);

    // you will need a call to "super"
    super("Object1", mesh);
  }
}
class Object2 extends GrObject {
  constructor() {
    let geometry = new T.BufferGeometry();
    const vertices = new Float32Array( [
      -1, 2, 1,   // 0
      1, 2, 1,    // 1
      -1, 2, -1,  // 2
      1, 2, -1,   // 3

      -1, 0, 1,   // 4
      1, 0, 1,    // 5
      -1, 0, -1,  // 6
      1, 0, -1,   // 7

      -1, 2, -1,  // 8
      1, 2, -1,   // 9
      -1, 0, -1,  // 10
      1, 0, -1,   // 11

      -1, 2, 1,   // 12
      1, 2, 1,    // 13
      -1, 0, 1,   // 14
      1, 0, 1,    // 15

      -1, 2, 1,   // 16
      -1, 2, -1,  // 17
      -1, 0, 1,   // 18
      -1, 0, -1,  // 19
      
      1, 2, 1,    // 20
      1, 2, -1,   // 21
      1, 0, 1,    // 22
      1, 0, -1,   // 23


  ]);
  geometry.setAttribute('position',new T.BufferAttribute(vertices,3));

  geometry.setIndex([
    0,1,2, 1,3,2,  //Top face
    4,6,5, 5,6,7, //Bottom face
    8,9,10, 9,11,10, //Front face
    12,14,13, 13,14,15, //Back face
    16,17,18, 17,19,18, //Left face
    20,22,21, 21,22,23 //Right face
  ]);

  geometry.computeVertexNormals();

  const colors = new Float32Array( [
    //Top and bottom collors
    1,1,0,
    1,0,0,
    1,1,0,
    1,0,0,
    1,1,0,
    1,0,0,
    1,1,0,
    1,0,0,

    //Front and back colors
    0,1,1,
    0,1,0,
    0,1,1,
    0,1,0,
    0,1,1,
    0,1,0,
    0,1,1,
    0,1,0,

    //Left and right colors
    1,0,1,
    1,0,0,
    1,0,1,
    1,0,0,
    1,0,1,
    1,0,0,
    1,0,1,
    1,0,0
    
]);

  geometry.setAttribute("color",new T.BufferAttribute(colors,3));
  
        let material = new T.MeshStandardMaterial({
          roughness: 0.75,
          vertexColors: true
        });
        let mesh = new T.Mesh(geometry, material);

    // you will need a call to "super"
    super("Object2", mesh);
  }
}
class Object3 extends GrObject {
  constructor() {
    let geometry = new T.BufferGeometry();
    const vertices = new Float32Array( [
      0,2,0,   // 0
      -1,2,-1,    // 1
      0,2,1,  // 2
      1,2,-1,   // 3

      0,0,0,   // 4
      -1,0,-1,    // 5
      0,0,1,  // 6
      1,0,-1,   // 7
    ]);
    geometry.setAttribute('position',new T.BufferAttribute(vertices,3));

    geometry.setIndex([
      0,1,2, 0,2,3,  //Top face
      4,6,5, 4,7,6, //Bottom face
      1,0,5, 0,4,5, 0,3,4, 3,7,4, //Front face left and right sides
      1,5,2, 2,5,6,//Back left face
      2,6,3, 3,6,7 //Back right face

    ]);

     const normals = new Float32Array([
                 -s2,0,s2,
                 0,0,1,      // point forward - which is the average direction
                 0,0,1,      // or the way it would be facing if it were curved
                 s2,0,s2
             ]);
             geometry.setAttribute("normal",new T.BufferAttribute(normals,3));

    const colors = new Float32Array( [
      1,.65,0,
      1,.65,0,
      1,.65,0,
      1,.65,0,
      1,.65,0,
      1,.65,0,
      1,.65,0,
      1,.65,0,
    ]);
    geometry.setAttribute("color",new T.BufferAttribute(colors,3));
  
        let material = new T.MeshStandardMaterial({
          roughness: 0.75,
          vertexColors: true
        });
        let mesh = new T.Mesh(geometry, material);
        
    // you will need a call to "super"
    super("Object3", mesh);
  }
}

// translate an object in the X direction
function shift(grobj, x) {
    grobj.objects.forEach(element => {
        element.translateX(x);
    });
  return grobj;
}

// Set the Object's Y rotate
function roty(grobj, ry) {
    grobj.objects.forEach(element => {
        element.rotation.y = ry;
    });
  return grobj;
}

/*
 * The world making code here assumes the objects are +/- 1
 * and have a single mesh as their THREE objects.
 * If you don't follow this convention, you will need to modify
 * the code below.
 * The code is a little funky because it is designed to work for
 * a variety of demos.
 */
let mydiv = document.getElementById("div1");

let box = InputHelpers.makeBoxDiv({ width: mydiv ? 640 : 820 }, mydiv);
if (!mydiv) {
    InputHelpers.makeBreak(); // sticks a break after the box
}
InputHelpers.makeHead("Three Different Objects", box);

let world = new GrWorld({ width: mydiv ? 600 : 800, where: box });
let tt = shift(new Object1(), -3);
world.add(tt);

let t2 = shift(new Object2(), 0);
world.add(t2);

let t3 = shift(new Object3(), 3);
world.add(t3);

let div = InputHelpers.makeBoxDiv({}, box);

let sl = new InputHelpers.LabelSlider("ry", { min: -2, max: 2, where: div });

InputHelpers.makeBreak(box);

sl.oninput = function(evt) {
    let v = sl.value();
    roty(tt,v);
    roty(t2,v);
    roty(t3,v);
};

world.go();
