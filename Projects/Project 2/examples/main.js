/*jshint esversion: 6 */
// @ts-check

//
// CS559 - Graphics Town - Workbook 12
// Example Code: 
// Example "Town"
//
// This sets up the town loading different objects. 
//
// It should be called from the onload function, after the world has been created

/** These imports are for the examples - feel free to remove them */
import { CircularTrack, TrackCube, TrackCar } from "./track.js";
import { SimpleCactus } from "./cactus.js";
import { SimpleGrave } from "./graves.js";
import { Wagon }  from "./wagon.js";
import {Bullet} from "./bullet.js";
import { Tent } from "./tent.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { SimpleWindmill} from "./loadins.js";
import { SimpleCowboy } from "./loadins.js";
import { SimpleRevolver } from "./loadins.js";
import { Campfire } from "./fire.js";


export function main(world) {
  // add ten placed cacti to the world with unique names
  let cactus1 = new SimpleCactus(25, 0);
  cactus1.name = "Cactus1";
  world.add(cactus1);
  let cactus2 = new SimpleCactus(-25, 0);
  cactus2.name = "Cactus2";
  world.add(cactus2);
  let cactus3 = new SimpleCactus(0, -25);
  cactus3.name = "Cactus3";
  world.add(cactus3);
  let cactus4 = new SimpleCactus(0, 25);
  cactus4.name = "Cactus4";
  world.add(cactus4);
  let cactus5 = new SimpleCactus(18, 18);
  cactus5.name = "Cactus5";
  world.add(cactus5);
  let cactus6 = new SimpleCactus(-18, 18);
  cactus6.name = "Cactus6";
  world.add(cactus6);
  let cactus7 = new SimpleCactus(18, -18);
  cactus7.name = "Cactus7";
  world.add(cactus7);
  let cactus8 = new SimpleCactus(-18, -18);
  cactus8.name = "Cactus8";
  world.add(cactus8);

  // add ten graves in the back 
  let dirtMaterialmap = new T.TextureLoader().load("../examples/assets/dirt.jpg");
  let headstoneMaterialmap = new T.TextureLoader().load("../examples/assets/stone.jpg");
  let grave1 = new SimpleGrave(-10, -10);
  grave1.name = "Grave1";
  grave1.dirtMaterial.map = dirtMaterialmap;
  grave1.headstoneMaterial.map = headstoneMaterialmap;
  world.add(grave1);
  let grave2 = new SimpleGrave(-8, -9);
  grave2.name = "Grave2";
  grave2.dirtMaterial.map = dirtMaterialmap;
  grave2.headstoneMaterial.map = headstoneMaterialmap;
  world.add(grave2);
  let grave3 = new SimpleGrave(-6, -10);
  grave3.name = "Grave3";
  grave3.dirtMaterial.map = dirtMaterialmap;
  grave3.headstoneMaterial.map = headstoneMaterialmap;
  world.add(grave3);
  let grave4 = new SimpleGrave(-4, -9);
  grave4.name = "Grave4";
  grave4.dirtMaterial.map = dirtMaterialmap;
  grave4.headstoneMaterial.map = headstoneMaterialmap;
  world.add(grave4);
  let grave5 = new SimpleGrave(-2, -10);
  grave5.name = "Grave5";
  grave5.dirtMaterial.map = dirtMaterialmap;
  grave5.headstoneMaterial.map = headstoneMaterialmap;
  world.add(grave5);
  let grave6 = new SimpleGrave(0, -9);
  grave6.name = "Grave6";
  grave6.dirtMaterial.map = dirtMaterialmap;
  grave6.headstoneMaterial.map = headstoneMaterialmap;
  world.add(grave6);
  let grave7 = new SimpleGrave(2, -10);
  grave7.name = "Grave7";
  grave7.dirtMaterial.map = dirtMaterialmap;
  grave7.headstoneMaterial.map = headstoneMaterialmap;
  world.add(grave7);
  let grave8 = new SimpleGrave(4, -9);
  grave8.name = "Grave8";
  grave8.dirtMaterial.map = dirtMaterialmap;
  grave8.headstoneMaterial.map = headstoneMaterialmap;
  world.add(grave8);
  let grave9 = new SimpleGrave(6, -10);
  grave9.name = "Grave9";
  grave9.dirtMaterial.map = dirtMaterialmap;
  grave9.headstoneMaterial.map = headstoneMaterialmap;
  world.add(grave9);
  let grave10 = new SimpleGrave(8, -9);
  grave10.name = "Grave10";
  grave10.dirtMaterial.map = dirtMaterialmap;
  grave10.headstoneMaterial.map = headstoneMaterialmap;
  world.add(grave10);
  let grave11 = new SimpleGrave(10, -10);
  grave11.name = "Grave11";
  grave11.dirtMaterial.map = dirtMaterialmap;
  grave11.headstoneMaterial.map = headstoneMaterialmap;
  world.add(grave11);

  // add a track with the wagon
  let track = new CircularTrack();
  world.add(track);
  let wagon = new Wagon();
  wagon.setScale(0.5, 0.5, 0.5);
  world.add(wagon);
  wagon.name = "Wagon1";

  //TODO add animation to the wagon to follow the track

  // add 2 tents
  let tent1 = new Tent(12, 0);
  tent1.name = "Tent1";
  tent1
  world.add(tent1);
  let tent2 = new Tent(-12, 0);
  tent2.name = "Tent2";
  world.add(tent2);

  let windmill = new SimpleWindmill(17,-11);
  windmill.name = "Windmill1";
  world.add(windmill);
  windmill.setScale(4,4,4);

  //add cowboy and revolver
  let cowboy = new SimpleCowboy(-11,11);
  cowboy.name = "Cowboy1";
  world.add(cowboy);

  let revolver = new SimpleRevolver(-11,2, 11, 0);
  revolver.name = "Revolver1";
  world.add(revolver);


  //second cowboy
  let cowboy2 = new SimpleCowboy(11,11);
  cowboy2.name = "Cowboy2";
  world.add(cowboy2);

  let revolver2 = new SimpleRevolver(10,2, 11, Math.PI);
  revolver2.name = "Revolver2";
  world.add(revolver2);

  // add a bullet
  let bullet = new Bullet();
  bullet.name = "Bullet1";
  world.add(bullet);

  // add a skybox
  let skybox = new T.CubeTextureLoader().load([
    "../examples/assets/px.png",
    "../examples/assets/nx.png",
    "../examples/assets/py.png",
    "../examples/assets/ny.png",
    "../examples/assets/pz.png",
    "../examples/assets/nz.png"
  ]);
  world.scene.background = skybox;

  
  let campfire = new Campfire();
  campfire.name = "Campfire1";
  world.add(campfire);

}

