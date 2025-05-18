/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let world = new GrWorld();

class Domino extends GrObject {
    constructor(topNum, bottomNum) {
      //values based on dice geometry squished into domibno shape
      const w = 0.5, l = 1.0, h = 0.1;
      let geometry = new T.BufferGeometry();

      // spliting the top face so it can be textured differently for each half
      const topFace = [
        -w, h, 0,    w, h, 0,    w, h, l,    -w, h, l,
        -w, h, -l,   w, h, -l,   w, h, 0,    -w, h, 0,
      ];
      const vertices = new Float32Array([
        -w, -h, -l,   w, -h, -l,   w, -h, l,   -w, -h, l,
        ...topFace,
        -w, -h, -l,   -w, h, -l,   -w, h, l,   -w, -h, l,
        w, -h, -l,    w, h, -l,    w, h, l,    w, -h, l,
        -w, -h, l,    w, -h, l,    w, h, l,    -w, h, l,
        -w, -h, -l,   w, -h, -l,   w, h, -l,   -w, h, -l,
      ]);
      geometry.setAttribute('position', new T.BufferAttribute(vertices, 3));
  
      geometry.setIndex([
        0, 1, 2,   0, 2, 3, // Bottom
        4, 6, 5,   4, 7, 6, // Top
        8, 10, 9,  8,11,10, // top pt 2
        12,14,13, 12,15,14, // left
        16,17,18, 16,18,19, // right
        20,21,22, 20,22,23, // front
        24,26,25, 24,27,26, // back
      ]);
  
      // Get UV coordinates from value in Domino() call
      function getUVCoords(val) {
        const cellSize = 1 / 3;
        const posMap = {
          1: [1, 1],
          2: [0, 1],
          3: [1, 2],
          4: [1, 0],
          5: [2, 1],
          6: [2, 2],
        };
        let [col, row] = posMap[val] || [0, 0];
        let u_min = col * cellSize;
        let u_max = u_min + cellSize;
        let v_min = 1 - (row + 1) * cellSize;
        let v_max = v_min + cellSize;
        return [u_min, u_max, v_min, v_max];
      }
  
      const [u1_min, u1_max, v1_min, v1_max] = getUVCoords(topNum);
      const [u2_min, u2_max, v2_min, v2_max] = getUVCoords(bottomNum);
  
      const uvs = new Float32Array([
        // Bottom
        0, 0,  0, 0,  0, 0,  0, 0,
  
        // Top 
        u1_min, v1_max,
        u1_max, v1_max,
        u1_max, v1_min,
        u1_min, v1_min,
  
        // Bottom half 
        u2_min, v2_max,
        u2_max, v2_max,
        u2_max, v2_min,
        u2_min, v2_min,
  
        // the other sides that dont have texture really
        ...Array(32).fill(0),
      ]);
      geometry.setAttribute('uv', new T.BufferAttribute(uvs, 2));
      geometry.computeVertexNormals();
  
      let texture = new T.TextureLoader().load("../images/dice_texture.png");
      let material = new T.MeshStandardMaterial({
        color: "white",
        roughness: 0.75,
        map: texture,
      });
  
      let mesh = new T.Mesh(geometry, material);
      super("Domino", mesh);
    }
  }
  

function shift(grobj,z, y, x, r) {
    grobj.objects[0].translateZ(z);
    grobj.objects[0].translateY(y);
    grobj.objects[0].translateX(x);
    grobj.objects[0].rotateY(r);
    return grobj;
}

let domino1 = shift(new Domino(6,6), 0, 0, 0, 0);
let domino2 = shift(new Domino(6,3), -1.6, 0, -0.5, Math.PI / 2);
let domino3 = shift(new Domino(3,1), -3.2, 0, -1, 0);
let domino4 = shift(new Domino(2,6), 1.6, 0, 0.5, Math.PI / 2);

world.add(domino1);
world.add(domino2);
world.add(domino3);
world.add(domino4);
world.go();
