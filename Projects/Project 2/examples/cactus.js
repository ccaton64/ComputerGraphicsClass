import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class SimpleCactus extends GrObject {

    constructor(x, z) {
        let cactusGroup = new T.Group();

        // Create the cactus body (a cylinder)
        let bodyGeometry = new T.CylinderGeometry(0.5, 0.5, 2, 8);
        let bodyMaterial = new T.MeshPhongMaterial({ color: "green" });
        let bodyMesh = new T.Mesh(bodyGeometry, bodyMaterial);
        bodyMesh.position.set(x, 1, z);

        // Create the cactus arms (two cylinders)
        let armGeometry = new T.CylinderGeometry(0.2, 0.2, 1, 8);
        let armMaterial = new T.MeshPhongMaterial({ color: "green" });
        let armMesh1 = new T.Mesh(armGeometry, armMaterial);

        // Make the position and rotation of the first arm radom
        armMesh1.position.set(
            x + (Math.random() * 1.5 - 0.75), 
            1 + Math.random() * 1,            
            z + (Math.random() * 1.5 - 0.75)   
        );
        armMesh1.rotation.z = Math.random() * Math.PI - Math.PI/2;
        armMesh1.rotation.y = Math.random() * Math.PI * 2;

        let armMesh2 = new T.Mesh(armGeometry, armMaterial);
        armMesh2.position.set(
            x + (Math.random() * 1.5 - 0.75),
            1 + Math.random() * 1,
            z + (Math.random() * 1.5 - 0.75)
        );
        armMesh2.rotation.z = Math.random() * Math.PI - Math.PI/2;
        armMesh2.rotation.y = Math.random() * Math.PI * 2;

        // Add all parts to the group
        cactusGroup.add(bodyMesh, armMesh1, armMesh2);

        //Spikes for the main body
        let spikeGeometry = new T.ConeGeometry(0.05, 0.2, 8);
        let spikeMaterial = new T.MeshPhongMaterial({ color: "yellow" });

        let rows = 6;
        let spikesPerRow = 8;

        for (let r = 0; r < rows; r++) {
            let height = 0.3 + (r / (rows - 1)) * 1.4;
            for (let s = 0; s < spikesPerRow; s++) {
                let angle = (s / spikesPerRow) * Math.PI * 2;
                let spike = new T.Mesh(spikeGeometry, spikeMaterial);

                spike.position.set(
                    x + 0.5 * Math.cos(angle),
                    height,
                    z + 0.5 * Math.sin(angle)
                );

                spike.lookAt(x, height, z);

                cactusGroup.add(spike);
            }
        }

        // Spikes for each arm ---
        function addSpikesToArm(armMesh) {
            let armRows = 4; 
            let armSpikesPerRow = 6;

            for (let r = 0; r < armRows; r++) {
                let height = (r / (armRows - 1)) * 1;
                for (let s = 0; s < armSpikesPerRow; s++) {
                    let angle = (s / armSpikesPerRow) * Math.PI * 2;
                    let spike = new T.Mesh(spikeGeometry, spikeMaterial);

                    // Place relative to arm's local center
                    spike.position.set(
                        0.2 * Math.cos(angle),
                        height - 0.5,
                        0.2 * Math.sin(angle)
                    );
                    armMesh.add(spike);
                }
            }
        }

        addSpikesToArm(armMesh1);
        addSpikesToArm(armMesh2);

        // Call the GrObject constructor with a name and the group
        super("SimpleCactus", cactusGroup);

        // Set position of the entire cactus
        this.setScale(0.75,1,0.75);
        this.positionX = x;
        this.positionZ = z;
        this.name = "Cactus";

    }
}