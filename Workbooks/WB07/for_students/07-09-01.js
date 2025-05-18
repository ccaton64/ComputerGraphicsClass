/*jshint esversion: 6 */
// @ts-check

// get things we need
import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { AutoUI } from "../libs/CS559-Framework/AutoUI.js";
import { GrCementMixer, GrCrane, GrExcavator, GrForkLift, GrWreckingBall } from "./07-09-constructionobjects.js";

let cDiv = document.getElementById("construction");
let world = new GrWorld({ groundplanesize: 10, where: cDiv, renderparams: {preserveDrawingBuffer:true}, id:"canvas" });

let crane = new GrCrane({ x: 2, z: -2 });
world.add(crane);
let c_ui = new AutoUI(crane, 300, cDiv, 1, true);

let excavator = new GrExcavator({ x: -2, z: 2 });
world.add(excavator);
let e_ui = new AutoUI(excavator, 300, cDiv, 1, true);
e_ui.set("x", -6);
e_ui.set("z", -3);
e_ui.set("theta", 36);

let forkLift = new GrForkLift({ x: -2, z: 2 });
 world.add(forkLift);
 let e_ui1 = new AutoUI(forkLift, 300, cDiv, 1, true);
 e_ui1.set("x", -5);
 e_ui1.set("z", 4);
 e_ui1.set("theta", 130);
 e_ui1.set("arm_extend", 0);
 e_ui1.set("fork_height", 0);

let wreckingBall = new GrWreckingBall({ x: -2, z: 2 });
world.add(wreckingBall);
let e_ui2 = new AutoUI(wreckingBall, 300, cDiv, 1, true);
e_ui2.set("x", 6);
e_ui2.set("z", 7);
e_ui2.set("theta", 130);
e_ui2.set("arm_rotate", 0);

let cementMixer = new GrCementMixer({ x: -2, z: 2 });
world.add(cementMixer);
let e_ui3 = new AutoUI(cementMixer, 300, cDiv, 1, true);
e_ui3.set("x", 0);
e_ui3.set("z", 4);
e_ui3.set("theta", 0);
e_ui3.set("pour", 0);


world.go();
