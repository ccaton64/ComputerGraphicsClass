/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define your buildings here - remember, they need to be imported
// into the "main" program

class Church extends GrObject {
  constructor() {
    let church = new T.Group();

    // Church base geometry
    let geometry = new T.BufferGeometry();
    const vertices = new Float32Array([
      -1, 2, 1,  1, 2, 1,  -1, 2, -1,  1, 2, -1,   // top rectangle
      -1, 0, 1,  1, 0, 1,  -1, 0, -1,  1, 0, -1,    // bottom rectangle
      -1, 2, -1, 1, 2, -1,  -1, 0, -1,  1, 0, -1,    // repeated for other faces
      -1, 2, 1,  1, 2, 1,  -1, 0, 1,  1, 0, 1,
      -1, 2, 1, -1, 2, -1, -1, 0, 1, -1, 0, -1,
      1, 2, 1,  1, 2, -1,  1, 0, 1,  1, 0, -1
    ]);
    geometry.setAttribute('position', new T.BufferAttribute(vertices, 3));
    let tl = new T.TextureLoader().load("../images/churchBase.png");
    let material = new T.MeshStandardMaterial({ color: "white", roughness: 0.75, map: tl });
    geometry.setIndex([
        0,1,2,  1,3,2,   4,6,5,  5,6,7,
        8,9,10, 9,11,10, 12,14,13, 13,14,15,
        16,17,18, 17,19,18, 20,22,21, 21,22,23
    ]);
    geometry.computeVertexNormals();
    const uvs = new Float32Array([
        1/3, 1 - 2/3,   2/3, 1 - 2/3,   1/3, 1 - 1/3,   2/3, 1 - 1/3,
        2/3, 1 - 3/3,   1.0, 1 - 3/3,   2/3, 1 - 2/3,   1.0, 1 - 2/3,
        0.0, 1 - 2/3,   1/3, 1 - 2/3,   0.0, 1 - 1/3,   1/3, 1 - 1/3,
        2/3, 1 - 2/3,   1.0, 1 - 2/3,   2/3, 1 - 1/3,   1.0, 1 - 1/3,
        1/3, 1 - 1/3,   2/3, 1 - 1/3,   1/3, 1.0,   2/3, 1.0,
        1/3, 1 - 3/3,   2/3, 1 - 3/3,   1/3, 1 - 2/3,   2/3, 1 - 2/3,
    ]);
    geometry.setAttribute('uv', new T.BufferAttribute(uvs, 2));
    
    let mesh = new T.Mesh(geometry, material);
    // Adjust the building’s orientation and position.
    mesh.rotateX(Math.PI);
    mesh.translateY(-2);
    mesh.scale.set(1.5, 1, 1);
    church.add(mesh);

    let roof = new T.Group();
    let roofGeometry = new T.ConeGeometry(2.2, 1, 4);
    roofGeometry.rotateY(Math.PI/4);
    let roofMaterial = new T.MeshStandardMaterial({ color: "tan", roughness: 0.75 });
    let roofMesh = new T.Mesh(roofGeometry, roofMaterial);
    roofMesh.position.y = 2.5;
    roof.add(roofMesh);
    church.add(roof);

    // church tower
    let tower = new T.Group();

    // church cross
    let cross = new T.Group();
    let across = new T.BoxGeometry(0.1, 1, 0.1);
    let across1 = new T.BoxGeometry(0.1, 0.1, 1);
    let crossMaterial = new T.MeshStandardMaterial({ color: "brown", roughness: 0.75, map: tl });
    let crossMesh = new T.Mesh(across, crossMaterial);
    let crossMesh1 = new T.Mesh(across1, crossMaterial);
    crossMesh.translateY(1);
    crossMesh1.translateY(1.25);
    crossMesh1.rotateY(Math.PI/2);
    cross.add(crossMesh);
    cross.add(crossMesh1);
    // Position the cross above the roof.
    cross.translateY(2.5);
    cross.rotateY(Math.PI/2);
    church.add(cross);

    super("Church", church);
  }
}

export { Church };


class Tent extends GrObject {
  constructor() {
    let tent = new T.Group();
    //tent base
    let baseGeom = new T.BoxGeometry(2.5, 0.1, 2);
    let baseMat = new T.MeshStandardMaterial({ color: "tan", roughness: 0.75 });
    let baseMesh = new T.Mesh(baseGeom, baseMat);
    tent.add(baseMesh);
    //side walls of cubes slanted into triangle
    let sideGeom = new T.BoxGeometry(0.1, 2, 2);
    let tl = new T.TextureLoader().load("../images/tent.png");
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
  }
}

export { Tent };

class Cactus extends GrObject {
    constructor() {
        let cactus = new T.Group();
        // Cactus body
        let bodyGeom = new T.CylinderGeometry(0.2, 0.2, 1.5, 16);
        let bodyMat = new T.MeshStandardMaterial({ color: "lightgreen", roughness: 0.75 });
        let bodyMesh = new T.Mesh(bodyGeom, bodyMat);
        bodyMesh.translateY(0.75);
        cactus.add(bodyMesh);
        // Cactus arms
        let armGeom = new T.CylinderGeometry(0.1, 0.1, 0.75, 16);
        let armMat = new T.MeshStandardMaterial({ color: "lightgreen", roughness: 0.75 });
        let armMesh1 = new T.Mesh(armGeom, armMat);
        let armMesh1b = new T.Mesh(armGeom, armMat);
        let armMesh2 = new T.Mesh(armGeom, armMat);
        let armMesh2b = new T.Mesh(armGeom, armMat);
        armMesh1.translateY(1.25);
        armMesh1b.translateY(1.6);
        armMesh1.translateX(-0.5);
        armMesh1b.translateX(-0.8);
        armMesh1.rotateZ(Math.PI / 2);
        armMesh2.translateY(1.25);
        armMesh2b.translateY(0.9);
        armMesh2.translateX(0.5);
        armMesh2b.translateX(0.8);
        armMesh2.rotateZ(-Math.PI / 2);
        cactus.add(armMesh1);
        cactus.add(armMesh1b);
        cactus.add(armMesh2);
        cactus.add(armMesh2b);
        


        super("Cactus", cactus);
    }
}
export { Cactus };