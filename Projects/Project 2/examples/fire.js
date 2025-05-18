import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

class Campfire extends GrObject {
  constructor() {
    const fire = new T.Group();

    // Log base (radial logs)
    const logMaterial = new T.MeshStandardMaterial({ color: "saddlebrown", roughness: 0.9 });
    for (let i = 0; i < 6; i++) {
      const log = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 2, 12), logMaterial);
      log.position.y = 0.05;
      log.rotation.z = Math.PI / 2;
      log.rotation.y = (Math.PI / 3) * i;
      log.position.x = Math.cos((Math.PI / 3) * i);
      log.position.z = Math.sin((Math.PI / 3) * i);
      fire.add(log);
    }

    // Flame balls
    const flameColors = ["orange", "#ff4500", "#ff8c00", "#ff6347", "#ffa500"];
    const flames = [];

    for (let i = 0; i < 5; i++) {
      const flameGeom = new T.SphereGeometry(0.25, 16, 16);
      const flameMat = new T.MeshStandardMaterial({
        color: flameColors[i],
        emissive: flameColors[i],
        transparent: true,
        opacity: 0.8
      });
      const flame = new T.Mesh(flameGeom, flameMat);
      flame.position.y = 0.5 + Math.random() * 0.1;
      flame.position.x = (Math.random() - 0.5) * 0.2;
      flame.position.z = (Math.random() - 0.5) * 0.2;
      flames.push({ mesh: flame, offset: Math.random() * Math.PI * 2 });
      fire.add(flame);
    }

    // Smoke
    const smokeMaterial = new T.MeshStandardMaterial({ color: "gray", transparent: true, opacity: 0.5 });
    const smokeParticles = [];
    for (let i = 0; i < 10; i++) {
      const puff = new T.Mesh(new T.SphereGeometry(0.1, 8, 8), smokeMaterial);
      puff.position.set((Math.random() - 0.5) * 0.5, 0.6 + i * 0.1, (Math.random() - 0.5) * 0.5);
      smokeParticles.push(puff);
      fire.add(puff);
    }

    // Call super AFTER everything is built
    super("Campfire", fire);

    // Now assign instance properties
    this.flames = flames;
    this.smoke = smokeParticles;
    this.t = 0;
  }

  stepWorld(delta, timeOfDay) {
    this.t += delta * 0.001;

    // Animate each flame independently
    for (let flameObj of this.flames) {
      const scale = 1 + 0.2 * Math.sin(this.t * 10 + flameObj.offset);
      flameObj.mesh.scale.set(scale, scale * 1.2, scale);
    }

    // Animate smoke
    for (let puff of this.smoke) {
      puff.position.y += 0.002;
      puff.material.opacity -= 0.0008;
      if (puff.material.opacity <= 0) {
        puff.position.y = 0.6;
        puff.material.opacity = 0.5;
      }
    }
  }
}

export { Campfire };
