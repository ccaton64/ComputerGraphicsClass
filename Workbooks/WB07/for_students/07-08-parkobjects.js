/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let simpleRoundaboutObCtr = 0;
// A simple merry-go-round.
/**
 * @typedef SimpleRoundaboutProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrSimpleRoundabout extends GrObject {
  /**
   * @param {SimpleRoundaboutProperties} params
   */
  constructor(params = {}) {
    let simpleRoundabout = new T.Group();

    let base_geom = new T.CylinderGeometry(0.5, 1, 0.5, 16);
    let base_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.5,
      roughness: 0.8
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.25);
    simpleRoundabout.add(base);

    let platform_geom = new T.CylinderGeometry(2, 1.8, 0.3, 8, 4);
    let platform_mat = new T.MeshStandardMaterial({
      color: "blue",
      metalness: 0.3,
      roughness: 0.6
    });

    let platform_group = new T.Group();
    base.add(platform_group);
    platform_group.translateY(0.25);
    let platform = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(platform);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`SimpleRoundabout-${simpleRoundaboutObCtr++}`, simpleRoundabout);
    this.whole_ob = simpleRoundabout;
    this.platform = platform_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    simpleRoundabout.scale.set(scale, scale, scale);
  }
  /**
   * StepWorld method
   * @param {*} delta 
   * @param {*} timeOfDay 
   */
  stepWorld(delta, timeOfDay) {
    this.platform.rotateY(0.005 * delta);
  }

}

let roundaboutObCtr = 0;
// A colorful merry-go-round, with handles and differently-colored sections.
/**
 * @typedef ColoredRoundaboutProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrColoredRoundabout extends GrObject {
  /**
   * @param {ColoredRoundaboutProperties} params
   */
  constructor(params = {}) {
    let roundabout = new T.Group();

    let base_geom = new T.CylinderGeometry(0.5, 1, 0.5, 16);
    let base_mat = new T.MeshStandardMaterial({
      color: "#888888",
      metalness: 0.5,
      roughness: 0.8
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.25);
    roundabout.add(base);

    let platform_group = new T.Group();
    base.add(platform_group);
    platform_group.translateY(0.25);

    let section_geom = new T.CylinderGeometry(
      2,
      1.8,
      0.3,
      8,
      4,
      false,
      0,
      Math.PI / 2
    );
    let section_mat;
    let section;

    let handle_geom = buildHandle();
    let handle_mat = new T.MeshStandardMaterial({
      color: "#999999",
      metalness: 0.8,
      roughness: 0.2
    });
    let handle;

    // in the loop below, we add four differently-colored sections, with handles,
    // all as part of the platform group.
    let section_colors = ["red", "blue", "yellow", "green"];
    for (let i = 0; i < section_colors.length; i++) {
      section_mat = new T.MeshStandardMaterial({
        color: section_colors[i],
        metalness: 0.3,
        roughness: 0.6
      });
      section = new T.Mesh(section_geom, section_mat);
      handle = new T.Mesh(handle_geom, handle_mat);
      section.add(handle);
      handle.rotation.set(0, Math.PI / 4, 0);
      handle.translateZ(1.5);
      platform_group.add(section);
      section.rotateY((i * Math.PI) / 2);
    }

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`Roundabout-${roundaboutObCtr++}`, roundabout);
    this.whole_ob = roundabout;
    this.platform = platform_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    roundabout.scale.set(scale, scale, scale);

    // This helper function defines a curve for the merry-go-round's handles,
    // then extrudes a tube along the curve to make the actual handle geometry.
    function buildHandle() {
      /**@type THREE.CurvePath */
      let handle_curve = new T.CurvePath();
      handle_curve.add(
        new T.LineCurve3(new T.Vector3(-0.5, 0, 0), new T.Vector3(-0.5, 0.8, 0))
      );
      handle_curve.add(
        new T.CubicBezierCurve3(
          new T.Vector3(-0.5, 0.8, 0),
          new T.Vector3(-0.5, 1, 0),
          new T.Vector3(0.5, 1, 0),
          new T.Vector3(0.5, 0.8, 0)
        )
      );
      handle_curve.add(
        new T.LineCurve3(new T.Vector3(0.5, 0.8, 0), new T.Vector3(0.5, 0, 0))
      );
      return new T.TubeGeometry(handle_curve, 64, 0.1, 8);
    }
  }
  /**
   * StepWorld Method
   * @param {*} delta 
   * @param {*} timeOfDay 
   */
  stepWorld(delta, timeOfDay) {
    this.platform.rotateY(0.005 * delta);
  }


}

let simpleSwingObCtr = 0;

// A basic, one-seat swingset.
/**
 * @typedef SimpleSwingProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrSimpleSwing extends GrObject {
  /**
   * @param {SimpleSwingProperties} params
   */
  constructor(params = {}) {
    let simpleSwing = new T.Group();
    addPosts(simpleSwing);

    // Here, we create a "hanger" group, which the swing chains will hang from.
    // The "chains" for the simple swing are just a couple thin cylinders.
    let hanger = new T.Group();
    simpleSwing.add(hanger);
    hanger.translateY(1.8);
    let chain_geom = new T.CylinderGeometry(0.05, 0.05, 1.4);
    let chain_mat = new T.MeshStandardMaterial({
      color: "#777777",
      metalness: 0.8,
      roughness: 0.2
    });
    let l_chain = new T.Mesh(chain_geom, chain_mat);
    let r_chain = new T.Mesh(chain_geom, chain_mat);
    hanger.add(l_chain);
    hanger.add(r_chain);
    l_chain.translateY(-0.75);
    l_chain.translateZ(0.4);
    r_chain.translateY(-0.75);
    r_chain.translateZ(-0.4);

    let seat_group = new T.Group();
    let seat_geom = new T.BoxGeometry(0.4, 0.1, 1);
    let seat_mat = new T.MeshStandardMaterial({
      color: "#554433",
      metalness: 0.1,
      roughness: 0.6
    });
    let seat = new T.Mesh(seat_geom, seat_mat);
    seat_group.add(seat);
    seat_group.position.set(0, -1.45, 0);
    hanger.add(seat_group);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`SimpleSwing-${simpleSwingObCtr++}`, simpleSwing);
    this.whole_ob = simpleSwing;
    this.hanger = hanger;
    this.seat = seat_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    simpleSwing.scale.set(scale, scale, scale);

    this.swing_max_rotation = Math.PI / 4;
    this.swing_direction = 1;

    // This helper function creates the 5 posts for a swingset frame,
    // and positions them appropriately.
    function addPosts(group) {
      let post_material = new T.MeshStandardMaterial({
        color: "red",
        metalness: 0.6,
        roughness: 0.5
      });
      let post_geom = new T.CylinderGeometry(0.1, 0.1, 2, 16);
      let flPost = new T.Mesh(post_geom, post_material);
      group.add(flPost);
      flPost.position.set(0.4, 0.9, 0.9);
      flPost.rotateZ(Math.PI / 8);
      let blPost = new T.Mesh(post_geom, post_material);
      group.add(blPost);
      blPost.position.set(-0.4, 0.9, 0.9);
      blPost.rotateZ(-Math.PI / 8);
      let frPost = new T.Mesh(post_geom, post_material);
      group.add(frPost);
      frPost.position.set(0.4, 0.9, -0.9);
      frPost.rotateZ(Math.PI / 8);
      let brPost = new T.Mesh(post_geom, post_material);
      group.add(brPost);
      brPost.position.set(-0.4, 0.9, -0.9);
      brPost.rotateZ(-Math.PI / 8);
      let topPost = new T.Mesh(post_geom, post_material);
      group.add(topPost);
      topPost.position.set(0, 1.8, 0);
      topPost.rotateX(-Math.PI / 2);
    }
  }
  /* stepWorld method - make the swing swing! */
    stepWorld(delta, timeOfDay) {
        // if we swing too far forward or too far backward, switch directions.
        if (this.hanger.rotation.z >= this.swing_max_rotation)
            this.swing_direction = -1;
        else if (this.hanger.rotation.z <= -this.swing_max_rotation)
            this.swing_direction = 1;
        this.hanger.rotation.z += this.swing_direction * 0.003 * delta;
    }

}

let swingObCtr = 0;

// A more complicated, one-seat swingset.
// This one has actual chain links for its chains,
// and uses a nicer animation to give a more physically-plausible motion.
/**
 * @typedef AdvancedSwingProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrAdvancedSwing extends GrObject {
  /**
   * @param {AdvancedSwingProperties} params
   */
  constructor(params = {}) {
    let swing = new T.Group();
    addPosts(swing);

    let hanger = new T.Group();
    swing.add(hanger);
    hanger.translateY(1.8);
    let l_chain = new T.Group();
    let r_chain = new T.Group();
    hanger.add(l_chain);
    hanger.add(r_chain);
    // after creating chain groups, call the function to add chain links.
    growChain(l_chain, 20);
    growChain(r_chain, 20);
    l_chain.translateZ(0.4);
    r_chain.translateZ(-0.4);

    let seat_group = new T.Group();
    let seat_geom = new T.BoxGeometry(0.4, 0.1, 1);
    let seat_mat = new T.MeshStandardMaterial({
      color: "#554433",
      metalness: 0.1,
      roughness: 0.6
    });
    let seat = new T.Mesh(seat_geom, seat_mat);
    seat_group.add(seat);
    seat_group.position.set(0, -1.45, 0);
    hanger.add(seat_group);

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`Swing-${swingObCtr++}`, swing);
    this.whole_ob = swing;
    this.hanger = hanger;
    this.seat = seat_group;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    swing.scale.set(scale, scale, scale);

    this.swing_angle = 0;

    // This helper function creates the 5 posts for a swingset frame,
    // and positions them appropriately.
    function addPosts(group) {
      let post_material = new T.MeshStandardMaterial({
        color: "red",
        metalness: 0.6,
        roughness: 0.5
      });
      let post_geom = new T.CylinderGeometry(0.1, 0.1, 2, 16);
      let flPost = new T.Mesh(post_geom, post_material);
      group.add(flPost);
      flPost.position.set(0.4, 0.9, 0.9);
      flPost.rotateZ(Math.PI / 8);
      let blPost = new T.Mesh(post_geom, post_material);
      group.add(blPost);
      blPost.position.set(-0.4, 0.9, 0.9);
      blPost.rotateZ(-Math.PI / 8);
      let frPost = new T.Mesh(post_geom, post_material);
      group.add(frPost);
      frPost.position.set(0.4, 0.9, -0.9);
      frPost.rotateZ(Math.PI / 8);
      let brPost = new T.Mesh(post_geom, post_material);
      group.add(brPost);
      brPost.position.set(-0.4, 0.9, -0.9);
      brPost.rotateZ(-Math.PI / 8);
      let topPost = new T.Mesh(post_geom, post_material);
      group.add(topPost);
      topPost.position.set(0, 1.8, 0);
      topPost.rotateX(-Math.PI / 2);
    }

    // Helper function to add "length" number of links to a chain.
    function growChain(group, length) {
      let chain_geom = new T.TorusGeometry(0.05, 0.015);
      let chain_mat = new T.MeshStandardMaterial({
        color: "#777777",
        metalness: 0.8,
        roughness: 0.2
      });
      let link = new T.Mesh(chain_geom, chain_mat);
      group.add(link);
      for (let i = 0; i < length; i++) {
        let l_next = new T.Mesh(chain_geom, chain_mat);
        l_next.translateY(-0.07);
        link.add(l_next);
        l_next.rotation.set(0, Math.PI / 3, 0);
        link = l_next;
      }
    }
  }
  /**
   * StepWorld method
   * @param {*} delta 
   * @param {*} timeOfDay 
   */
  stepWorld(delta, timeOfDay) {
    // in this animation, use the sine of the accumulated angle to set current rotation.
    // This means the swing moves faster as it reaches the bottom of a swing,
    // and faster at either end of the swing, like a pendulum should.
    this.swing_angle += 0.005 * delta;
    this.hanger.rotation.z = (Math.sin(this.swing_angle) * Math.PI) / 4;
    this.seat.rotation.z = (Math.sin(this.swing_angle) * Math.PI) / 16;
  }

}


let carouselObCtr = 0;
// A Carousel.
/**
 * @typedef CarouselProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrCarousel extends GrObject {
  /**
   * @param {CarouselProperties} params
   */
  constructor(params = {}) {
    let width = 3;
    let carousel = new T.Group();

    let base_geom = new T.CylinderGeometry(width, width, 1, 32);
    let base_mat = new T.MeshStandardMaterial({
      color: "lightblue",
      metalness: 0.3,
      roughness: 0.8
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(0.5);
    carousel.add(base);

    let platform_group = new T.Group();
    base.add(platform_group);
    platform_group.translateY(0.5);

    let platform_geom = new T.CylinderGeometry(
      0.95 * width,
      0.95 * width,
      0.2,
      32
    );
    let platform_mat = new T.MeshStandardMaterial({
      color: "gold",
      metalness: 0.3,
      roughness: 0.8
    });
    let platform = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(platform);

    let cpole_geom = new T.CylinderGeometry(0.3 * width, 0.3 * width, 3, 16);
    let cpole_mat = new T.MeshStandardMaterial({
      color: "gold",
      metalness: 0.8,
      roughness: 0.5
    });
    let cpole = new T.Mesh(cpole_geom, cpole_mat);
    platform_group.add(cpole);
    cpole.translateY(1.5);

    let top_trim = new T.Mesh(platform_geom, platform_mat);
    platform_group.add(top_trim);
    top_trim.translateY(3);

    let opole_geom = new T.CylinderGeometry(0.03 * width, 0.03 * width, 3, 16);
    let opole_mat = new T.MeshStandardMaterial({
      color: "#aaaaaa",
      metalness: 0.8,
      roughness: 0.5
    });
    let opole;
    let num_poles = 10;
    let poles = [];
    for (let i = 0; i < num_poles; i++) {
      opole = new T.Mesh(opole_geom, opole_mat);
      platform_group.add(opole);
      opole.translateY(1.5);
      opole.rotateY((2 * i * Math.PI) / num_poles);
      opole.translateX(0.8 * width);
      poles.push(opole);
    }

    let roof_geom = new T.ConeGeometry(width, 0.5 * width, 32, 4);
    let roof = new T.Mesh(roof_geom, base_mat);
    carousel.add(roof);
    roof.translateY(4.8);


    //add a diff color circle to each pole
    let horses = [];
    let colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "cyan", "magenta"];
    for (let i = 0; i < num_poles; i++) {
      let pole_geom = new T.CylinderGeometry(0.1 * width, 0.05 * width, 0.2, 16);
      let pole_mat = new T.MeshStandardMaterial({
        color: colors[i],
        metalness: 0.8,
        roughness: 0.5
      });
      let pole = new T.Mesh(pole_geom, pole_mat);
      poles[i].add(pole);
      pole.translateY(-1);
      horses.push(pole);
    }

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`Carousel-${carouselObCtr++}`, carousel);
    this.whole_ob = carousel;
    this.platform = platform;
    this.poles = poles;
    this.horses = horses;

    // put the object in its place
    this.whole_ob.position.x = params.x ? Number(params.x) : 0;
    this.whole_ob.position.y = params.y ? Number(params.y) : 0;
    this.whole_ob.position.z = params.z ? Number(params.z) : 0;
    let scale = params.size ? Number(params.size) : 1;
    carousel.scale.set(scale, scale, scale);
  }
  /**
   * StepWorld method
   * @param {*} delta 
   * @param {*} timeOfDay 
   */
  stepWorld(delta, timeOfDay) {
    this.whole_ob.rotateY(0.001 * delta);

    //make horses go constantly up and down based on where they are and the time of day
    for (let i = 0; i < this.horses.length; i++) {
      let angle = (2 * Math.PI * i) / this.horses.length + this.whole_ob.rotation.y;
      this.horses[i].position.y = Math.sin(angle) * 0.5;
    }
  }
}

let birdObCtr = 0;
// A bird.
/**
 * @typedef BirdProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrBird extends GrObject {
  /**
   * @param {BirdProperties} params
   */
  constructor(params = {}) {
    let bird = new T.Group();
    let birdBody = new T.SphereGeometry(0.5, 32, 32);
    let birdMaterial = new T.MeshStandardMaterial({ color: "lightblue" });
    let body = new T.Mesh(birdBody, birdMaterial);
    bird.add(body);
    body.scale.setY(0.5);
    body.scale.setZ(0.5);

    let wingL = new T.Mesh(new T.BoxGeometry(0.2, 0.1, .5), birdMaterial);
    wingL.position.set(0, 0, .4);
    bird.add(wingL);

    let wingR = new T.Mesh(new T.BoxGeometry(0.2, 0.1, .5), birdMaterial);
    wingR.position.set(0, 0, -.4);
    bird.add(wingR);

    let head = new T.Mesh(new T.SphereGeometry(0.2, 32, 32), birdMaterial);
    head.position.set(0.4, 0.2, 0);
    bird.add(head);


    bird.position.y = 5;
    bird.position.z = 5;

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`Bird-${birdObCtr++}`, bird);
    this.whole_ob = bird;
    this.wingL = wingL;
    this.wingR = wingR;
    this.angle = 0;
    this.flapAngle = 0;

  }

  /**
   * StepWorld method
   * @param {*} delta 
   * @param {*} timeOfDay 
   */
  stepWorld(delta, timeOfDay) {
    this.angle += 0.002 * delta; // Adjust speed if needed
    let radius = 3;
    
    // Circular motion
    this.whole_ob.position.x = radius * Math.cos(this.angle);
    this.whole_ob.position.z = radius * Math.sin(this.angle);
    this.whole_ob.lookAt(0, this.whole_ob.position.y, 0);

    // Wing flapping
    this.flapAngle += 0.05 * delta;
    let flapRotation = Math.sin(this.flapAngle) * 0.5;
    this.wingL.rotation.x = flapRotation;
    this.wingR.rotation.x = -flapRotation;
  }
}

let flatObCtr = 0;
// A flat ride.
/**
 * @typedef FlatProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrFlatRide extends GrObject {
  /**
   * @param {FlatProperties} params
   */
  constructor(params = {}) {
    let flatRide = new T.Group();

    //base
    let base_geom = new T.CylinderGeometry(1, 1, 2, 16);
    let base_mat = new T.MeshStandardMaterial({
      color: "lightblue",
      metalness: 0.3,
      roughness: 0.8
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(1);
    flatRide.add(base);

    //add 4 arms sticking out the side
    let arms = new T.Group();
    let arm1 = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 2, 16), base_mat);
    arm1.translateX(1);
    arm1.translateY(1);
    arm1.rotateZ(Math.PI / 2);
    arms.add(arm1);

    let arm2 = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 2, 16), base_mat);
    arm2.translateX(-1);
    arm2.translateY(1);
    arm2.rotateZ(Math.PI / 2);
    arms.add(arm2);

    let arm3 = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 2, 16), base_mat);
    arm3.translateZ(1);
    arm3.translateY(1);
    arm3.rotateX(Math.PI / 2);
    arms.add(arm3);

    let arm4 = new T.Mesh(new T.CylinderGeometry(0.05, 0.05, 2, 16), base_mat);
    arm4.translateZ(-1);
    arm4.translateY(1);
    arm4.rotateX(Math.PI / 2);
    arms.add(arm4);

    //add a box to the end of each arm
    let box_geom = new T.BoxGeometry(0.4, 0.4, 0.4);
    let box_mat = new T.MeshStandardMaterial({ color: "red" });
    let box1 = new T.Mesh(box_geom, box_mat);
    box1.translateX(2);
    box1.translateY(1);
    arms.add(box1);

    let box2 = new T.Mesh(box_geom, box_mat);
    box2.translateX(-2);
    box2.translateY(1);
    arms.add(box2);

    let box3 = new T.Mesh(box_geom, box_mat);
    box3.translateZ(2);
    box3.translateY(1);
    arms.add(box3);

    let box4 = new T.Mesh(box_geom, box_mat);
    box4.translateZ(-2);
    box4.translateY(1);
    arms.add(box4);

    flatRide.add(arms);
    flatRide.position.z = -10;

    // note that we have to make the Object3D before we can call
    // super and we have to call super before we can use this
    super(`Bird-${birdObCtr++}`, flatRide);
    this.whole_ob = flatRide;
    this.arms = arms;
  }

  /**
   * StepWorld method
   * @param {*} delta 
   * @param {*} timeOfDay 
   */
  stepWorld(delta, timeOfDay) {
    //make the whole thing spin
    this.whole_ob.rotateY(0.001 * delta);

    //todo make the arms rotate up and down like these rides do
  }
}

let teaObCtr = 0;
// A flat ride.
/**
 * @typedef TeaProperties
 * @type {object}
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [size=1]
 */
export class GrTeaRide extends GrObject {
  /**
   * @param {TeaProperties} params
   */
  constructor(params = {}) {
    let teaRide = new T.Group();

    // Base of the ride
    let base_geom = new T.CylinderGeometry(5, 5, 0.5, 16);
    let base_mat = new T.MeshStandardMaterial({
      color: "yellow",
      metalness: 0.3,
      roughness: 0.8
    });
    let base = new T.Mesh(base_geom, base_mat);
    base.translateY(1);
    teaRide.add(base);

    let cupsGroup = new T.Group();

    let cupArray = [];

    let cupPositions = [
      { x: 2, z: 2 },
      { x: 2, z: -2 },
      { x: -2, z: -2 },
      { x: -2, z: 2 }
    ];

    let colors = ["blue", "green", "red", "purple"];

    for (let i = 0; i < 4; i++) {
      let cupGroup = new T.Group();
      let cup_geom = new T.CylinderGeometry(1, 1, 1.5, 16);
      let cup_mat = new T.MeshStandardMaterial({ color: colors[i] });
      let cupBody = new T.Mesh(cup_geom, cup_mat);
      cupGroup.add(cupBody);
      let cupHandle = new T.Mesh(new T.TorusGeometry(0.6, 0.05, 16, 90), cup_mat);
      cupHandle.position.y = -0.5;
      cupHandle.rotateZ(Math.PI / 3);
      cupHandle.translateY(1);
      cupGroup.add(cupHandle);
      cupGroup.position.set(cupPositions[i].x, 2, cupPositions[i].z);
      cupsGroup.add(cupGroup);
      cupArray.push(cupGroup);
    }

    teaRide.add(cupsGroup);
    teaRide.position.set(10, 0, -10);

    super(`Tea-${teaObCtr++}`, teaRide);
    this.whole_ob = teaRide;
    this.cupsGroup = cupsGroup;
    this.cupArray = cupArray;
  }

  stepWorld(delta, timeOfDay) {
    // Make the whole ride spin
    this.whole_ob.rotateY(0.001 * delta);

    // Make each cup spin around its own center
    this.cupArray.forEach(cup => {
      cup.rotateY(0.005 * delta);
    });
  }
}
