import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class SimpleGrave extends GrObject {

    constructor(x, z) {
        let graveGroup = new T.Group();

        //make the dirt box it sits on
        let dirtGeometry = new T.BoxGeometry(1, 0.1, 1);
        let dirtMaterial = new T.MeshStandardMaterial({ color: "saddlebrown" });
        let dirtMesh = new T.Mesh(dirtGeometry, dirtMaterial);
        dirtMesh.position.set(x, 0.05, z);
        graveGroup.add(dirtMesh);

        //make the headstone
        let headstoneGeometry = new T.BoxGeometry(0.5, 1, 0.1); 
        let headstoneMaterial = new T.MeshStandardMaterial({ color: "gray" });
        let headstoneMesh = new T.Mesh(headstoneGeometry, headstoneMaterial);
        headstoneMesh.position.set(x, 0.55, z);
        graveGroup.add(headstoneMesh);

        // Call the GrObject constructor with a name and the group
        super("SimpleGrave", graveGroup);

        // Set position of the entire cactus
        this.setScale(1.75,2,1.75);
        this.dirtMaterial = dirtMaterial;
        this.headstoneMaterial = headstoneMaterial;
        this.positionX = x;
        this.positionZ = z;
        this.name = "Grave";

    }
}