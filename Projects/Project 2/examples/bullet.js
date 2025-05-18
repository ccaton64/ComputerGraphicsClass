import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program

class Bullet extends GrObject {
    constructor() {
      // Bullet mesh
      let bulletGeometry = new T.SphereGeometry(0.5, 16, 16);
      let bulletMaterial = new T.MeshStandardMaterial({ color: "yellow", roughness: 0.85 });
      let bullet = new T.Mesh(bulletGeometry, bulletMaterial);
      super("Bullet", bullet);
  
      // Movement control
      this.points = [
        new T.Vector3(-10, 2, 11),     // Start point (initial position)
        new T.Vector3(0, 2, 11),    // Middle waypoint
        new T.Vector3(11, 2, 11)       // End point
      ];
      this.currentSegment = 0;
      this.t = 0; // Interpolation factor between 0 and 1
      this.speed = 0.0015; // Adjust speed as needed
      this.forward = true; // Whether it's going forward or backward
  
      // Start position
      this.objects[0].position.copy(this.points[0]);
  
      // Ride point
      this.ridePoint = new T.Object3D();
      this.ridePoint.translateY(1.5);
      this.ridePoint.rotateY(Math.PI / 2);
      this.objects[0].add(this.ridePoint);
      this.rideable = this.ridePoint;
    }
  
    stepWorld(delta, timeOfDay) {
      this.t += this.speed * delta;
      if (this.t > 1) {
        this.t = 0;
        if (this.forward) {
          this.currentSegment++;
          if (this.currentSegment >= this.points.length - 1) {
            this.forward = false;
          }
        } else {
          this.currentSegment--;
          if (this.currentSegment <= 0) {
            this.forward = true;
          }
        }
      }
  
      const start = this.points[this.currentSegment];
      const end = this.points[this.currentSegment + (this.forward ? 1 : -1)];
      const position = new T.Vector3().lerpVectors(start, end, this.t);
      this.objects[0].position.copy(position);
    }
  }
  export { Bullet };