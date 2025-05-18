import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Loaders from "../libs/CS559-Framework/loaders.js";

export class SimpleWindmill extends Loaders.FbxGrObject {
  constructor(x, z) {
    moveTo(x, 0.2, z);
    super({
      fbx: "../examples/assets/wINDmIll.fbx",
      norm: 2.0,
      name: "Windmill",
      color: "saddlebrown",
    });
    if (this.objects[0]) {
        this.objects[0].position.set(x, 0.2, z);
    } else {
        // Fallback or error handling if the object wasn't created as expected
        console.error("Windmill object not found after super() call.");
    }
    this.positionX = x;
    this.positionZ = z;
    this.positionY = 0.2;
    this.u = 0;
    this.name = "Windmill";
  }
}

export class SimpleCowboy extends Loaders.FbxGrObject {
    constructor(x, z){
        moveTo(x, 0.2, z);
        super({
            fbx: "../examples/assets/cowboy.fbx",
            norm: 2.0,
            name: "Cowboy",
            color: "saddlebrown",
        });
        if (this.objects[0]) {
            this.objects[0].position.set(x, 0.2, z);
        } else {
            // Fallback or error handling if the object wasn't created as expected
            console.error("Cowboy object not found after super() call.");
        }
        this.positionX = x;
        this.positionZ = z;
        this.positionY = 0.2;
        this.u = 0;
        this.name = "Cowboy";
    }
}

export class SimpleRevolver extends Loaders.FbxGrObject{
    constructor(x, y, z, r){
        moveTo(x, y, z);
        super({
            fbx: "../examples/assets/revolver.fbx",
            norm: 2.0,
            name: "Revolver",
            color: "grey",
        });
        if (this.objects[0]) {
            this.objects[0].position.set(x, y, z);
            this.objects[0].rotation.set(0, r, 0); // Set rotation around the Y-axis
        } else {
            // Fallback or error handling if the object wasn't created as expected
            console.error("Revolver object not found after super() call.");
        }
        this.setScale(0.5, 0.5, 0.5);
        this.positionX = x;
        this.positionY = y;
        this.positionZ = z;
        this.u = 0;
        this.name = "Revolver";
    }
}