/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

function degreesToRadians(deg) {
  return (deg * Math.PI) / 180;
}

let craneObCtr = 0;

// A simple crane
/**
 * @typedef CraneProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCrane extends GrObject {
  /**
   * @param {CraneProperties} params
   */
  constructor(params = {}) {
    let crane = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.5,
      bevelEnabled: false
    };

    // first, we define the base of the crane.
    // Just draw a curve for the shape, then use three's "ExtrudeGeometry"
    // to create the shape itself.
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-0.5, 0);
    base_curve.lineTo(-0.5, 2);
    base_curve.lineTo(-0.25, 2.25);
    base_curve.lineTo(-0.25, 5);
    base_curve.lineTo(-0.2, 5);
    base_curve.lineTo(-0.2, 5.5);
    base_curve.lineTo(0.2, 5.5);
    base_curve.lineTo(0.2, 5);
    base_curve.lineTo(0.25, 5);
    base_curve.lineTo(0.25, 2.25);
    base_curve.lineTo(0.5, 2);
    base_curve.lineTo(0.5, 0);
    base_curve.lineTo(-0.5, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let crane_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, crane_mat);
    crane.add(base);
    base.translateZ(-0.25);

    // Use a similar process to create the cross-arm.
    // Note, we create a group for the arm, and move it to the proper position.
    // This ensures rotations will behave nicely,
    // and we just have that one point to work with for animation/sliders.
    let arm_group = new T.Group();
    crane.add(arm_group);
    arm_group.translateY(4.5);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-1.5, 0);
    arm_curve.lineTo(-1.5, 0.25);
    arm_curve.lineTo(-0.5, 0.5);
    arm_curve.lineTo(4, 0.4);
    arm_curve.lineTo(4, 0);
    arm_curve.lineTo(-1.5, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm = new T.Mesh(arm_geom, crane_mat);
    arm_group.add(arm);
    arm.translateZ(-0.25);

    // Finally, add the hanging "wire" for the crane arm,
    // which is what carries materials in a real crane.
    // The extrusion makes this not look very wire-like, but that's fine for what we're doing.
    let wire_group = new T.Group();
    arm_group.add(wire_group);
    wire_group.translateX(3);
    let wire_curve = new T.Shape();
    wire_curve.moveTo(-0.25, 0);
    wire_curve.lineTo(-0.25, -0.25);
    wire_curve.lineTo(-0.05, -0.3);
    wire_curve.lineTo(-0.05, -3);
    wire_curve.lineTo(0.05, -3);
    wire_curve.lineTo(0.05, -0.3);
    wire_curve.lineTo(0.25, -0.25);
    wire_curve.lineTo(0.25, 0);
    wire_curve.lineTo(-0.25, 0);
    let wire_geom = new T.ExtrudeGeometry(wire_curve, exSettings);
    let wire_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let wire = new T.Mesh(wire_geom, wire_mat);
    wire_group.add(wire);
    wire.translateZ(-0.25);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // This is also where we define parameters for UI sliders.
    // These have format "name," "min", "max", "starting value."
    // Sliders are standardized to have 30 "steps" per slider,
    // so if your starting value does not fall on one of the 30 steps,
    // the starting value in the UI may be slightly different from the starting value you gave.
    super(`Crane-${craneObCtr++}`, crane, [
      ["x", -4, 4, 0],
      ["z", -4, 4, 0],
      ["theta", 0, 360, 0],
      ["wire", 1, 3.5, 2],
      ["arm_rotation", 0, 360, 0]
    ]);
    // Here, we store the crane, arm, and wire groups as part of the "GrCrane" object.
    // This allows us to modify transforms as part of the update function.
    this.whole_ob = crane;
    this.arm = arm_group;
    this.wire = wire_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    crane.scale.set(scale, scale, scale);
  }

  // Wire up the wire position and arm rotation to match parameters,
  // given in the call to "super" above.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.wire.position.x = paramValues[3];
    this.arm.rotation.y = degreesToRadians(paramValues[4]);
  }
}

let excavatorObCtr = 0;

// A simple excavator
/**
 * @typedef ExcavatorProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrExcavator extends GrObject {
  /**
   * @param {ExcavatorProperties} params
   */
  constructor(params = {}) {
    let excavator = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    // As with the crane, we define the base (treads) of the excavator.
    // We draw a line, then extrude the line with ExtrudeGeometry,
    // to get the "cutout" style object.
    // Note, for this object, we translate each piece by 0.25 on the negative x-axis.
    // This makes rotation about the y-axis work nicely
    // (since the extrusion happens along +z, a y-rotation goes around an axis on the back face of the piece,
    //  rather than an axis through the center of the piece).
    /**@type THREE.Shape */
    let base_curve = new T.Shape();
    base_curve.moveTo(-1, 0);
    base_curve.lineTo(-1.2, 0.2);
    base_curve.lineTo(-1.2, 0.4);
    base_curve.lineTo(-1, 0.6);
    base_curve.lineTo(1, 0.6);
    base_curve.lineTo(1.2, 0.4);
    base_curve.lineTo(1.2, 0.2);
    base_curve.lineTo(1, 0);
    base_curve.lineTo(-1, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let excavator_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, excavator_mat);
    excavator.add(base);
    base.translateZ(-0.2);

    // We'll add the "pedestal" piece for the cab of the excavator to sit on.
    // It can be considered a part of the treads, to some extent,
    // so it doesn't need a group of its own.
    let pedestal_curve = new T.Shape();
    pedestal_curve.moveTo(-0.35, 0);
    pedestal_curve.lineTo(-0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0);
    pedestal_curve.lineTo(-0.35, 0);
    let pedestal_geom = new T.ExtrudeGeometry(pedestal_curve, exSettings);
    let pedestal = new T.Mesh(pedestal_geom, excavator_mat);
    excavator.add(pedestal);
    pedestal.translateY(0.6);
    pedestal.translateZ(-0.2);

    // For the cab, we create a new group, since the cab should be able to spin on the pedestal.
    let cab_group = new T.Group();
    excavator.add(cab_group);
    cab_group.translateY(0.7);
    let cab_curve = new T.Shape();
    cab_curve.moveTo(-1, 0);
    cab_curve.lineTo(1, 0);
    cab_curve.lineTo(1.2, 0.35);
    cab_curve.lineTo(1, 0.75);
    cab_curve.lineTo(0.25, 0.75);
    cab_curve.lineTo(0, 1.5);
    cab_curve.lineTo(-0.8, 1.5);
    cab_curve.lineTo(-1, 1.2);
    cab_curve.lineTo(-1, 0);
    let cab_geom = new T.ExtrudeGeometry(cab_curve, exSettings);
    let cab = new T.Mesh(cab_geom, excavator_mat);
    cab_group.add(cab);
    cab.translateZ(-0.2);

    // Next up is the first part of the bucket arm.
    // In general, each piece is just a series of line segments,
    // plus a bit of extra to get the geometry built and put into a group.
    // We always treat the group as the "pivot point" around which the object should rotate.
    // It is helpful to draw the lines for extrusion with the zero at our desired "pivot point."
    // This minimizes the fiddling needed to get the piece placed correctly relative to its parent's origin.
    // The remaining few pieces are very similar to the arm piece.
    let arm_group = new T.Group();
    cab_group.add(arm_group);
    arm_group.position.set(-0.8, 0.5, 0);
    let arm_curve = new T.Shape();
    arm_curve.moveTo(-2.25, 0);
    arm_curve.lineTo(-2.35, 0.15);
    arm_curve.lineTo(-1, 0.5);
    arm_curve.lineTo(0, 0.25);
    arm_curve.lineTo(-0.2, 0);
    arm_curve.lineTo(-1, 0.3);
    arm_curve.lineTo(-2.25, 0);
    let arm_geom = new T.ExtrudeGeometry(arm_curve, exSettings);
    let arm_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.6,
      roughness: 0.3
    });
    let arm = new T.Mesh(arm_geom, arm_mat);
    arm_group.add(arm);
    arm.translateZ(-0.2);

    let forearm_group = new T.Group();
    arm_group.add(forearm_group);
    forearm_group.position.set(-2.1, 0, 0);
    let forearm_curve = new T.Shape();
    forearm_curve.moveTo(-1.5, 0);
    forearm_curve.lineTo(-1.5, 0.1);
    forearm_curve.lineTo(0, 0.15);
    forearm_curve.lineTo(0.15, 0);
    forearm_curve.lineTo(-1.5, 0);
    let forearm_geom = new T.ExtrudeGeometry(forearm_curve, exSettings);
    let forearm = new T.Mesh(forearm_geom, arm_mat);
    forearm_group.add(forearm);
    forearm.translateZ(-0.2);

    let bucket_group = new T.Group();
    forearm_group.add(bucket_group);
    bucket_group.position.set(-1.4, 0, 0);
    let bucket_curve = new T.Shape();
    bucket_curve.moveTo(-0.25, -0.9);
    bucket_curve.lineTo(-0.5, -0.5);
    bucket_curve.lineTo(-0.45, -0.3);
    bucket_curve.lineTo(-0.3, -0.2);
    bucket_curve.lineTo(-0.15, 0);
    bucket_curve.lineTo(0.1, 0);
    bucket_curve.lineTo(0.05, -0.2);
    bucket_curve.lineTo(0.5, -0.7);
    bucket_curve.lineTo(-0.25, -0.9);
    let bucket_geom = new T.ExtrudeGeometry(bucket_curve, exSettings);
    let bucket = new T.Mesh(bucket_geom, arm_mat);
    bucket_group.add(bucket);
    bucket.translateZ(-0.2);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    // The parameters for sliders are also defined here.
    super(`Excavator-${excavatorObCtr++}`, excavator, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["spin", 0, 360, 0],
      ["arm_rotate", 0, 50, 45],
      ["forearm_rotate", 0, 90, 45],
      ["bucket_rotate", -90, 45, 0]
    ]);
    // As with the crane, we save the "excavator" group as the "whole object" of the GrExcavator class.
    // We also save the groups of each object that may be manipulated by the UI.
    this.whole_ob = excavator;
    this.cab = cab_group;
    this.arm = arm_group;
    this.forearm = forearm_group;
    this.bucket = bucket_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    excavator.scale.set(scale, scale, scale);
  }

  // As with the crane, we wire up each saved group with the appropriate parameter defined in the "super" call.
  // Note, with the forearm, there is an extra bit of rotation added, which allows us to create a rotation offset,
  // while maintaining a nice 0-90 range for the slider itself.
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.cab.rotation.y = degreesToRadians(paramValues[3]);
    this.arm.rotation.z = degreesToRadians(-paramValues[4]);
    this.forearm.rotation.z = degreesToRadians(paramValues[5]) + Math.PI / 16;
    this.bucket.rotation.z = degreesToRadians(paramValues[6]);
  }
}

let forkLiftObCtr = 0;

// A simple forklift
/**
 * @typedef ForkLiftProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrForkLift extends GrObject {
  /**
   * @param {ForkLiftProperties} params
   */
  constructor(params = {}) {
    let forklift = new T.Group();
    //draw forklift

    //wheels 4 cylinders
    let wheels = new T.Group();
    let wheel_geom = new T.CylinderGeometry(0.5, 0.5, 0.25, 16);
    let wheel_mat = new T.MeshStandardMaterial({
      color: "black",
      metalness: 0.5,
      roughness: 0.7
    });
    let wheel1 = new T.Mesh(wheel_geom, wheel_mat);
    let wheel2 = new T.Mesh(wheel_geom, wheel_mat);
    let wheel3 = new T.Mesh(wheel_geom, wheel_mat);
    let wheel4 = new T.Mesh(wheel_geom, wheel_mat);
    wheel1.position.set(-1, 0.25, 1);
    wheel1.rotateX(Math.PI / 2);
    wheel2.position.set(-1, 0.25, -1);
    wheel2.rotateX(Math.PI / 2);
    wheel3.position.set(1, 0.25, 1);
    wheel3.rotateX(Math.PI / 2);
    wheel4.position.set(1, 0.25, -1);
    wheel4.rotateX(Math.PI / 2);
    wheels.add(wheel1);
    wheels.add(wheel2);
    wheels.add(wheel3);
    wheels.add(wheel4);
    wheels.position.setY(0.25);
    forklift.add(wheels);

    //body rectangle box
    let body_geom = new T.BoxGeometry(3, 0.5, 2);
    let body_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let body = new T.Mesh(body_geom, body_mat);
    body.position.set(0, 0.5, 0);
    forklift.add(body);

    //cage
    let cage = new T.Group();
    let pole_geom = new T.BoxGeometry(0.25, 1.5, 0.25);
    let cage_mat = new T.MeshStandardMaterial({
      color: "gray",
      metalness: 0.5,
      roughness: 0.7
    });
    let pole1 = new T.Mesh(pole_geom, cage_mat);
    let pole2 = new T.Mesh(pole_geom, cage_mat);
    let pole3 = new T.Mesh(pole_geom, cage_mat);
    let pole4 = new T.Mesh(pole_geom, cage_mat);
    pole1.position.set(0, 1.5, 0.75);
    pole2.position.set(0, 1.5, -0.75);
    pole3.position.set(1.25, 1.5, 0.75);
    pole4.position.set(1.25, 1.5, -0.75);
    cage.add(pole1);
    cage.add(pole2);
    cage.add(pole3);
    cage.add(pole4);
    let top_geom = new T.BoxGeometry(1.5, 0.25, 1.5);
    let top = new T.Mesh(top_geom, cage_mat);
    top.position.set(0.625, 2.25, 0);
    cage.add(top);
    forklift.add(cage);
    
    //front
    let arm = new T.Group();
    let front_geom = new T.BoxGeometry(0.25, 2, 0.75);
    let front_mat = new T.MeshStandardMaterial({
      color: "silver",
      metalness: 0.8,
      roughness: 0.3
    });
    let front = new T.Mesh(front_geom, front_mat);
    front.position.set(-1, 1.5, 0);
    arm.add(front);

    //forks
    let forks = new T.Group();
    let fork_geom = new T.BoxGeometry(0.1, 2, 0.3);
    let fork1 = new T.Mesh(fork_geom, front_mat);
    let fork2 = new T.Mesh(fork_geom, front_mat);
    fork1.position.set(-2, 1, 0.25);
    fork1.rotateZ(Math.PI / 2);
    fork2.position.set(-2, 1, -0.25);
    fork2.rotateZ(Math.PI / 2);
    forks.add(fork1);
    forks.add(fork2);

    arm.add(forks);

    //fork connector
    let connector_geom = new T.BoxGeometry(2.25, 0.25, 0.25);
    let connector = new T.Mesh(connector_geom, front_mat);
    connector.position.set(0, 0.5, 0);
    arm.add(connector);

    forklift.add(arm);

    super(`ForkLift-${forkLiftObCtr++}`, forklift, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["arm_extend", 0, 2.5, 45],
      ["fork_height", 0, 1.5, 45]
    ]);
    this.whole_ob = forklift;
    this.arm = arm;
    this.forks = forks;
  }

  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.arm.position.x = paramValues[3] * -1;
    this.forks.position.y = paramValues[4];
  }
}

let wreckingBallObCtr = 0;

// A simple wrecking ball
/**
 * @typedef WreckingBallProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrWreckingBall extends GrObject {
  /**
   * @param {WreckingBallProperties} params
   */
  constructor(params = {}) {
    let wreckingBall = new T.Group();

    let exSettings = {
      steps: 2,
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 2
    };

    //base tank wheels style
    let base_curve = new T.Shape();
    base_curve.moveTo(-1, 0);
    base_curve.lineTo(-1.2, 0.2);
    base_curve.lineTo(-1.2, 0.4);
    base_curve.lineTo(-1, 0.6);
    base_curve.lineTo(1, 0.6);
    base_curve.lineTo(1.2, 0.4);
    base_curve.lineTo(1.2, 0.2);
    base_curve.lineTo(1, 0);
    base_curve.lineTo(-1, 0);
    let base_geom = new T.ExtrudeGeometry(base_curve, exSettings);
    let excavator_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base = new T.Mesh(base_geom, excavator_mat);
    base.scale.set(1.5,1.5,1.5);
    wreckingBall.add(base);
    base.translateZ(-0.2);

    // We'll add the "pedestal" piece for the cab of the excavator to sit on.
    // It can be considered a part of the treads, to some extent,
    // so it doesn't need a group of its own.
    let pedestal_curve = new T.Shape();
    pedestal_curve.moveTo(-0.35, 0);
    pedestal_curve.lineTo(-0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0.25);
    pedestal_curve.lineTo(0.35, 0);
    pedestal_curve.lineTo(-0.35, 0);
    let pedestal_geom = new T.ExtrudeGeometry(pedestal_curve, exSettings);
    let pedestal = new T.Mesh(pedestal_geom, excavator_mat);
    pedestal.scale.set(1.5,1.5,1.5);
    pedestal.translateY(0.6);
    wreckingBall.add(pedestal);
    pedestal.translateY(0.6);
    pedestal.translateZ(-0.2);

    let cab_group = new T.Group(); // everything above the base

    //body cube on base
    let body_geom = new T.BoxGeometry(3, 1, 1.5);
    let body_mat = new T.MeshStandardMaterial({
      color: "orange",
      metalness: 0.7,
      roughness: 0.7
    });
    let body = new T.Mesh(body_geom, body_mat);
    cab_group.add(body);
    body.translateY(1.75);
    body.translateX(-1.5);

    //cage thing
    let cage_group = new T.Group();

    let pole_geom = new T.BoxGeometry(0.25, 1.5, 0.25);
    let cage_mat = new T.MeshStandardMaterial({
      color: "gray",
      metalness: 0.5,
      roughness: 0.7
    });
    let pole1 = new T.Mesh(pole_geom, cage_mat);
    let pole2 = new T.Mesh(pole_geom, cage_mat);
    let pole3 = new T.Mesh(pole_geom, cage_mat);
    let pole4 = new T.Mesh(pole_geom, cage_mat);
    pole1.position.set(0, 1.5, 0.75);
    pole2.position.set(0, 1.5, -0.75);
    pole3.position.set(1.25, 1.5, 0.75);
    pole4.position.set(1.25, 1.5, -0.75);
    cage_group.add(pole1);
    cage_group.add(pole2);
    cage_group.add(pole3);
    cage_group.add(pole4);
    let top_geom = new T.BoxGeometry(1.5, 0.25, 1.5);
    let top = new T.Mesh(top_geom, cage_mat);
    top.position.set(0.625, 2.25, 0);
    cage_group.add(top);
    cage_group.position.set(-2.75, 1.25, 0);
    cage_group.scale.setZ(0.75);
    cab_group.add(cage_group);

    //arm
    let arm_position = 0;
    let arm_group = new T.Group(); //includes the arm ball and strings
    let arm = new T.BoxGeometry(0.5, 6, 0.5);
    let arm_mat = new T.MeshStandardMaterial({
      color: "gray",
      metalness: 0.5,
      roughness: 0.7
    });
    let arm_mesh = new T.Mesh(arm, arm_mat);
    arm_group.add(arm_mesh);
    arm_group.position.set(0.25, 6, 0);
    arm_mesh.scale.setZ(0.75);

    let arm_stabalizer = new T.Mesh(arm, arm_mat);
    arm_stabalizer.position.set(0.25, 3, 0);
    arm_stabalizer.scale.setY(0.75);
    arm_stabalizer.position.setY(2);

    arm_position = arm_group.position.x;

    cab_group.add(arm_stabalizer);
    cab_group.add(arm_group);
    //ball
    let ball_geom = new T.SphereGeometry(1, 32, 32);
    let ball_mat = new T.MeshStandardMaterial({
      color: "black",
      metalness: 0.5,
      roughness: 0.7
    });
    let ball_group = new T.Group();
    let ball = new T.Mesh(ball_geom, ball_mat);
    ball.position.set(2, 2, 0);
    ball_group.add(ball);
    //strings
    let string_geom = new T.CylinderGeometry(0.05, 0.05, 2, 32);
    let string_mat = new T.MeshStandardMaterial({
      color: "white",
      metalness: 0.5,
      roughness: 0.7
    });
    let string = new T.Mesh(string_geom, string_mat);
    string.position.set(1, 2.5, 0);
    string.rotateZ(Math.PI / 3);
    
    ball_group.add(string);
    ball_group.position.set(0, 0, 0);

    arm_group.add(ball_group);


    wreckingBall.add(cab_group);

    
    let ball_positionX = ball_group.position.x;
    let ball_positionY = ball_group.position.y;

    super(`WreckingBall-${wreckingBallObCtr++}`, wreckingBall, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["cab_rotate", 0, 360, 0],
      ["arm_rotate", 0, 45, 0], 
      ["ball_position", 0, 4, 0],
      ["ball_height", 0, 2, 0]
    ]);
    this.whole_ob = wreckingBall;
    this.cab = cab_group;
    this.arm = arm_group;
    this.arm_position = arm_position;
    this.ball_group = ball_group;
    this.ball = ball;
    this.ball_positionX = ball_positionX;
    this.ball_positionY = ball_positionY;
    this.string = string;
    this.stringHeigt = string.position.y;
    this.stringPos = string.position.x;
  }
  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.cab.rotation.y = degreesToRadians(paramValues[3]);
    this.arm.rotation.z = degreesToRadians(paramValues[4] * -1);
    this.arm.position.x = this.arm_position + paramValues[4] * 0.05;
    this.ball_group.position.y = -paramValues[5];
    this.string.scale.setY(1 + paramValues[6]);
    let scale = 1 + paramValues[6];
    this.string.position.setY(this.stringHeigt - 0.5 * paramValues[6]);
    this.string.position.setX(this.stringPos + 0.8 * paramValues[6]);
    this.ball.position.setY(this.stringHeigt - 1.5 * paramValues[6]);
    this.ball.position.setX(scale + this.stringPos + 0.8 * paramValues[6]);

    
  }
}

let cementMixerObCtr = 0;

// A simple cement mixer
/**
 * @typedef CementMixerProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCementMixer extends GrObject {
  /**
   * @param {CementMixerProperties} params
   */
  constructor(params = {}) {
    let cementMixer = new T.Group();
    //wheels
    let wheels = new T.Group();
    let wheel_geom = new T.CylinderGeometry(0.25, 0.25, 0.25, 16);
    let wheel_mat = new T.MeshStandardMaterial({
      color: "black",
      metalness: 0.5,
      roughness: 0.7
    });
    let wheel1 = new T.Mesh(wheel_geom, wheel_mat);
    let wheel2 = new T.Mesh(wheel_geom, wheel_mat);
    let wheel3 = new T.Mesh(wheel_geom, wheel_mat);
    let wheel4 = new T.Mesh(wheel_geom, wheel_mat);
    wheel1.position.set(-1, 0.25, 0.5);
    wheel1.rotateX(Math.PI / 2);
    wheel2.position.set(-1, 0.25, -0.5);
    wheel2.rotateX(Math.PI / 2);
    wheel3.position.set(1, 0.25, 0.5);
    wheel3.rotateX(Math.PI / 2);
    wheel4.position.set(1, 0.25, -0.5);
    wheel4.rotateX(Math.PI / 2);
    wheels.add(wheel1);
    wheels.add(wheel2);
    wheels.add(wheel3);
    wheels.add(wheel4)
    cementMixer.add(wheels);

    //frame
    let frame = new T.Group();
    let base_frame_geom = new T.BoxGeometry(2, 0.25, 1);
    let frame_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.5,
      roughness: 0.7
    });
    let base_frame = new T.Mesh(base_frame_geom, frame_mat);
    base_frame.position.set(0, 0.5,0);
    frame.add(base_frame);
    let side_frame_geom = new T.BoxGeometry(0.25, 1.5, 0.25);
    let side_frame = new T.Mesh(side_frame_geom, frame_mat);
    side_frame.position.set(-1.125, 1, 0);
    frame.add(side_frame);

    let box_frame_geom = new T.BoxGeometry(0.8, 1.5, 0.8);
    let box_mat = new T.MeshStandardMaterial({
      color: "orange",
      metalness: 0.5,
      roughness: 0.7
    });
    let box_frame = new T.Mesh(box_frame_geom, box_mat);
    box_frame.position.set(0.75, 1.25, 0);
    frame.add(box_frame);

    cementMixer.add(frame);
    //drum
    let drum = new T.Group();
    let drum_geom = new T.CylinderGeometry(0.5, 0.5, 0.8, 16);
    let drum_mat = new T.MeshStandardMaterial({
      color: "gray",
      metalness: 0.5,
      roughness: 0.7
    });
    let drum_mesh = new T.Mesh(drum_geom, drum_mat);
    drum_mesh.position.set(-0.3, 1.5, 0);
    drum.add(drum_mesh);



    cementMixer.add(drum);

    //spinner
    let spinner = new T.Group();
    let spinner_base = new T.TorusGeometry(0.5, 0.05, 16, 100);
    let spinner_mat = new T.MeshStandardMaterial({
      color: "gray",
      metalness: 0.5,
      roughness: 0.7
    });
    let spinner_mesh = new T.Mesh(spinner_base, spinner_mat);
    spinner_mesh.position.set(-1.3,1.5, 0);
    spinner_mesh.rotateY(Math.PI / 2);
    spinner.add(spinner_mesh);
    let spoke1 = new T.CylinderGeometry(0.05, 0.05, 1, 16);
    let spoke1_mesh = new T.Mesh(spoke1, spinner_mat);
    spoke1_mesh.position.set(-1.3, 1.5, 0);
    spoke1_mesh.rotateY(Math.PI / 2);
    spinner.add(spoke1_mesh);
    let spoke2 = new T.CylinderGeometry(0.05, 0.05, 1, 16);
    let spoke2_mesh = new T.Mesh(spoke2, spinner_mat);
    spoke2_mesh.position.set(-1.3, 1.5, 0);
    spoke2_mesh.rotateZ(-Math.PI / 4);
    spoke2_mesh.rotateX(Math.PI / 2);
    spinner.add(spoke2_mesh);

    let connector = new T.CylinderGeometry(0.05, 0.05, 2, 16);
    let connector_mesh = new T.Mesh(connector, spinner_mat);
    connector_mesh.position.set(-0.5, 1.5, 0);
    connector_mesh.rotateZ(Math.PI / 2);
    spinner.add(connector_mesh);

    cementMixer.add(spinner);

    super(`CementMixer-${cementMixerObCtr++}`, cementMixer, [
      ["x", -10, 10, 0],
      ["z", -10, 10, 0],
      ["theta", 0, 360, 0],
      ["pour", 0, 45, 0]
    ]);
    this.whole_ob = cementMixer;
    this.spinner = spinner;
    this.drum = drum_mesh;
    this.drum_positionZ = drum_mesh.position.z;
    this.drum_positionY = drum_mesh.position.y;
  }

  update(paramValues) {
    this.whole_ob.position.x = paramValues[0];
    this.whole_ob.position.z = paramValues[1];
    this.whole_ob.rotation.y = degreesToRadians(paramValues[2]);
    this.drum.rotation.x = degreesToRadians(paramValues[3]);
  }
}