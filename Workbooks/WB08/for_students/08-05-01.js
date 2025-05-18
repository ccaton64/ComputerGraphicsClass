/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let world = new GrWorld(); 
class Dice extends GrObject {
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

  let tl = new T.TextureLoader().load("../images/dice_texture.png");
        let material = new T.MeshStandardMaterial({
          color: "white",
          roughness: 0.75,
          map: tl
        });

  geometry.setIndex([
    0,1,2, 1,3,2,  //Top face
    4,6,5, 5,6,7, //Bottom face
    8,9,10, 9,11,10, //Front face
    12,14,13, 13,14,15, //Back face
    16,17,18, 17,19,18, //Left face
    20,22,21, 21,22,23 //Right face
  ]);

  geometry.computeVertexNormals();
  const uvs = new Float32Array([
    // Top face (1) - col 1, row 1
    1/3, 1 - 2/3,
    2/3, 1 - 2/3,
    1/3, 1 - 1/3,
    2/3, 1 - 1/3,
  
    // Bottom face (6) - col 2, row 2
    2/3, 1 - 3/3,
    1.0, 1 - 3/3,
    2/3, 1 - 2/3,
    1.0, 1 - 2/3,
  
    // Front face (2) - col 0, row 1
    0.0, 1 - 2/3,
    1/3, 1 - 2/3,
    0.0, 1 - 1/3,
    1/3, 1 - 1/3,
  
    // Back face (5) - col 2, row 1
    2/3, 1 - 2/3,
    1.0, 1 - 2/3,
    2/3, 1 - 1/3,
    1.0, 1 - 1/3,
  
    // Left face (4) - col 1, row 0
    1/3, 1 - 1/3,
    2/3, 1 - 1/3,
    1/3, 1.0,
    2/3, 1.0,
  
    // Right face (3) - col 1, row 2
    1/3, 1 - 3/3,
    2/3, 1 - 3/3,
    1/3, 1 - 2/3,
    2/3, 1 - 2/3,
  ]);
  
  geometry.setAttribute('uv', new T.BufferAttribute(uvs, 2));

    let mesh = new T.Mesh(geometry, material);
    // you will need a call to "super"
    super("Dice", mesh);
  }
}

// put the two dice into the world Here
// don't forget to orient them so they have different numbers facing up

function shift(grobj, y, x, r) {
    grobj.objects[0].translateY(y);
    grobj.objects[0].translateX(x);
    grobj.objects[0].rotateX(r);
    return grobj;
  }

let d1 = shift(new Dice(), 0, -3, 0);
world.add(d1);

let d2 = shift(new Dice(), 1, 3, Math.PI/2);
world.add(d2);

world.go();

