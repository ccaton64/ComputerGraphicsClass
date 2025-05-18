/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

class Tent extends GrObject {
  constructor(x,z) {
    let tent = new T.Group();
    tent.position.set(x, 0, z);
    //tent base
    let baseGeom = new T.BoxGeometry(2.5, 0.1, 2);
    let baseMat = new T.MeshStandardMaterial({ color: "tan", roughness: 0.75 });
    let baseMesh = new T.Mesh(baseGeom, baseMat);
    tent.add(baseMesh);
    //side walls of cubes slanted into triangle
    let sideGeom = new T.BoxGeometry(0.1, 2, 2);
    let tl = new T.TextureLoader().load("../examples/assets/tent.png");
    let sideMat = new T.MeshStandardMaterial({ color: "tan", roughness: 0.75, map: tl });
    let sideMesh1 = new T.Mesh(sideGeom, sideMat);
    let sideMesh2 = new T.Mesh(sideGeom, sideMat);
    sideMesh1.translateX(-0.7);
    sideMesh1.translateY(0.6);
    sideMesh1.rotateZ(-Math.PI/4);
    sideMesh2.translateX(0.7);
    sideMesh2.translateY(0.6);
    sideMesh2.rotateZ(Math.PI/4);
    tent.add(sideMesh1);
    tent.add(sideMesh2);
    
    //tent back wall triangle as well
    let backGeom = new T.BufferGeometry();
    const backVertices = new Float32Array([
      -1.25, 0.01, -1,  1.25, 0.01, -1,  0, 1.25, -1 // triangle vertices
    ]);
    backGeom.setAttribute('position', new T.BufferAttribute(backVertices, 3));
    backGeom.setIndex([0, 1, 2,  1, 0, 2]);
    backGeom.computeVertexNormals();

    //add material to back wall
    let backMat = new T.MeshStandardMaterial({ color: "tan", roughness: 0.75 });
    let backMesh = new T.Mesh(backGeom, backMat);
    backMesh.translateY(0);
    backMesh.translateZ(-2);
    backMesh.rotateY(Math.PI);
    tent.add(backMesh);


    //tent pole in the middle front
    let poleGeom = new T.CylinderGeometry(0.1, 0.1, 1.25, 16);
    let poleMat = new T.MeshStandardMaterial({ color: "brown", roughness: 0.75 });
    let poleMesh = new T.Mesh(poleGeom, poleMat);
    poleMesh.translateY(0.6);
    poleMesh.translateZ(0.8);
    tent.add(poleMesh);

    super("Tent", tent);
    this.name = "Tent";
    this.positionX = x;
    this.positionZ = z;
  }
}

export { Tent };