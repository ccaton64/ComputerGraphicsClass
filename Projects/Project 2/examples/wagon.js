/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program

class Wagon extends GrObject {
  constructor() {
    let wagon = new T.Group();

    // 4 wheels that are outer rims connected by multiple spokes
    let wheels = new T.Group();
    let wheelGeometry = new T.TorusGeometry(0.5, 0.05, 16, 100);
    let wheelMaterial = new T.MeshStandardMaterial({ color: "brown", roughness: 0.85 });
    let wheel1 = new T.Mesh(wheelGeometry, wheelMaterial);
    wheel1.translateY(0.5);
    wheel1.translateX(-1.5);

    let spoke1 = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 1, 16), wheelMaterial);
    spoke1.translateY(0);
    spoke1.translateX(0);
    spoke1.translateZ(0);
    spoke1.rotateZ(0);
    let spoke2 = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 1, 16), wheelMaterial);
    spoke2.translateY(0);
    spoke2.translateX(0);
    spoke2.translateZ(0);
    spoke2.rotateZ(Math.PI / 3);
    let spoke3 = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 1, 16), wheelMaterial);
    spoke3.translateY(0);
    spoke3.translateX(0);
    spoke3.translateZ(0);
    spoke3.rotateZ(Math.PI / -3);
    wheel1.add(spoke1);
    wheel1.add(spoke2);
    wheel1.add(spoke3);
    
    let wheel2 = wheel1.clone();
    wheel2.translateX(3);
    let wheel3 = wheel1.clone();
    wheel3.translateZ(3);
    let wheel4 = wheel1.clone();
    wheel4.translateX(3);
    wheel4.translateZ(3);

    wheels.add(wheel1);
    wheels.add(wheel2);
    wheels.add(wheel3);
    wheels.add(wheel4);
    wagon.add(wheels);

    // metal spokes connecting the wheels side to side and front to back. grey to have color variation
    let metalMaterial = new T.MeshStandardMaterial({ color: "grey", roughness: 0.35, metalness: 0.5 });
    let spokeGeometry = new T.CylinderGeometry(0.05, 0.05, 3.5, 16);
    let pole1 = new T.Mesh(spokeGeometry, metalMaterial);
    pole1.translateX(-1.5);
    pole1.translateY(0.5);
    pole1.translateZ(1.5);
    pole1.rotateX(Math.PI / 2);
    let pole2 = new T.Mesh(spokeGeometry, metalMaterial);
    pole2.translateX(1.5);
    pole2.translateY(0.5);
    pole2.translateZ(1.5);
    pole2.rotateX(Math.PI / 2);
    let pole3 = new T.Mesh(spokeGeometry, metalMaterial);
    pole3.scale.set(1, 0.85, 4);
    pole3.translateX(0);
    pole3.translateY(0.5);
    pole3.translateZ(1);
    pole3.rotateY(Math.PI / 2);
    pole3.rotateX(Math.PI / 2);
    let pole4 = new T.Mesh(spokeGeometry, metalMaterial);
    pole4.scale.set(1, 0.85, 4);
    pole4.translateX(0);
    pole4.translateY(0.5);
    pole4.translateZ(2);
    pole4.rotateY(Math.PI / 2);
    pole4.rotateX(Math.PI / 2);
    wagon.add(pole1);
    wagon.add(pole2);
    wagon.add(pole3);
    wagon.add(pole4);
    // base of 6 long planks that are connected by 2 short planks on each side
    let base = new T.Group();
    let plankGeometry = new T.BoxGeometry(4, 0.05, 0.3);
    let plankMaterial = new T.MeshStandardMaterial({ color: "saddlebrown", roughness: 0.85 });
    let plank1 = new T.Mesh(plankGeometry, plankMaterial);
    plank1.translateY(0.75);
    plank1.translateZ(0.5);
    let plank2 = new T.Mesh(plankGeometry, plankMaterial);
    plank2.translateY(0.75);
    plank2.translateZ(1);
    let plank3 = new T.Mesh(plankGeometry, plankMaterial);
    plank3.translateY(0.75);
    plank3.translateZ(1.5);
    let plank4 = new T.Mesh(plankGeometry, plankMaterial);
    plank4.translateY(0.75);
    plank4.translateZ(2);
    let plank5 = new T.Mesh(plankGeometry, plankMaterial);
    plank5.translateY(0.75);
    plank5.translateZ(2.5);

    let plank6 = new T.Mesh(plankGeometry, plankMaterial);
    plank6.translateY(0.7);
    plank6.translateX(0.75)
    plank6.translateZ(1.5);
    plank6.scale.set(0.6, 1, 2);
    plank6.rotateY(Math.PI / 2);
    let plank7 = new T.Mesh(plankGeometry, plankMaterial);
    plank7.translateY(0.7);
    plank7.translateX(-0.75)
    plank7.translateZ(1.5);
    plank7.scale.set(0.6, 1, 2);
    plank7.rotateY(Math.PI / 2);

    base.add(plank1);
    base.add(plank2);
    base.add(plank3);
    base.add(plank4);
    base.add(plank5);
    base.add(plank6);
    base.add(plank7);
    wagon.add(base);

    // left and right side are similar to base but rotated 90 degrees and connected to the base
    let side = base.clone();
    side.translateX(0);
    side.translateZ(3.5);
    side.translateY(0.25);
    side.scale.set(1, 1.25, 0.3);
    side.rotateX(Math.PI / -2.5);
    wagon.add(side);
    let side2 = base.clone();
    side2.translateX(0);
    side2.translateZ(-0.75);
    side2.translateY(1.2);
    side2.scale.set(1, 1.25, 0.3);
    side2.rotateX(Math.PI / 2.5);
    wagon.add(side2);

    let sideup = base.clone();
    sideup.translateX(0);
    sideup.translateZ(3.6);
    sideup.translateY(1);
    sideup.scale.set(1, 1, 0.6);
    sideup.rotateX(Math.PI / -2);
    wagon.add(sideup);
    let sideup2 = base.clone();
    sideup2.translateX(0);
    sideup2.translateZ(1);
    sideup2.translateY(1.2);
    sideup2.scale.set(1, 1, 0.6);
    sideup2.rotateX(Math.PI / -2);
    wagon.add(sideup2);

    // front and back is just bars connecting the left and right side
    let front1 = new T.Mesh(plankGeometry, plankMaterial);
    front1.translateY(1.2);
    front1.translateX(2);
    front1.translateZ(1.5);
    front1.rotateY(Math.PI / 2);
    front1.rotateX(Math.PI / 2);
    front1.scale.set(0.7, 1, 0.8);

    let front2 = front1.clone();
    front2.translateZ(0.3);
    front2.scale.set(0.6, 1, 0.8);

    let back1 = front1.clone();
    back1.translateY(-4);
    let back2 = front2.clone();
    back2.translateY(-4);
    let back3 = front1.clone();
    back3.translateY(-4);
    back3.translateZ(-0.3);
    let back4 = front1.clone();
    back4.translateY(-4);
    back4.translateZ(-0.6);
    let back5 = front1.clone();
    back5.translateY(-4);
    back5.translateZ(-0.9);
    let back6 = front1.clone();
    back6.translateY(-4);
    back6.translateZ(-1.2);

    wagon.add(front1);
    wagon.add(front2);
    wagon.add(back1);
    wagon.add(back2);
    wagon.add(back3);
    wagon.add(back4);
    wagon.add(back5);
    wagon.add(back6);

    // wagon cover
    let cover = new T.BoxGeometry(4, 3, 0.15);
    let coverMaterial = new T.MeshStandardMaterial({ color: "white", roughness: 0.85 });
    let cover1 = new T.Mesh(cover, coverMaterial);
    cover1.translateY(2.75);
    cover1.translateZ(1.5);
    cover1.rotateX(Math.PI / 2);
    wagon.add(cover1);

    // thing to connect the wagon to the horse
    let reins = new T.BoxGeometry(0.25, 0.1, 2);
    let reinsMaterial = new T.MeshStandardMaterial({ color: "black", roughness: 0.85 });
    let reins1 = new T.Mesh(reins, reinsMaterial);
    reins1.translateY(1);
    reins1.translateZ(0.75);
    reins1.translateX(3);
    reins1.rotateY(Math.PI / 2);
    let reins2 = reins1.clone();
    reins2.translateX(-1.5);
    wagon.add(reins1);
    wagon.add(reins2);


    super( "Wagon", wagon );
    this.name = "Wagon";
    this.ridePoint = new T.Object3D();
    this.ridePoint.translateY(1.5);
    this.ridePoint.translateX(-10.5);
    this.ridePoint.rotateY(Math.PI / 2);
    this.objects[0].add(this.ridePoint);
    this.rideable = this.ridePoint;
  }

  stepWorld(delta, timeOfDay) {
    if (!this.theta) this.theta = 0; // Initialize theta if it doesn't exist

    // Increase the angle
    this.theta += delta * 0.001; // adjust 0.5 for wagon speed

    // Radius of the circle
    let radius = 8;

    // Calculate new x, z positions
    let x = radius * Math.cos(this.theta);
    let z = radius * Math.sin(this.theta);

    // Move the wagon
    this.objects[0].position.set(x, 0, z);

    // Face the direction of movement
    this.objects[0].rotation.y = -this.theta - Math.PI / 2;

    // --- Rotate the wheels ---

    // Find the group that holds the wheels
    let wagonGroup = this.objects[0];
    let wheelsGroup = wagonGroup.children.find(obj => obj.type === "Group"); // wheels are the first group you added

    if (wheelsGroup) {
        // how much distance did the wagon move in this frame
        let distance = delta * 0.5 * radius;

        // wheel radius
        let wheelRadius = 0.5; // you used 0.5 for wheel size

        // how much to rotate the wheels (arc length formula: θ = distance / radius)
        let wheelRotation = distance / wheelRadius;

        // Spin all wheels around X axis
        wheelsGroup.children.forEach(wheel => {
            wheel.rotation.z -= wheelRotation * 0.001;
        });
    }
}

}

export { Wagon };

