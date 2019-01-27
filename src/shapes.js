import {COORDS, GAME_WIDTH, GAME_HEIGHT, FIG_FRAME_RATE, FIG_SIZE} from './utils/constants'

export let shapes = null;

const spawnCoords = [
  COORDS.XY.topLeft,
  COORDS.XY.topCenter, 
  COORDS.XY.topRight
];

const INIT_TIMEOUT = 1846;

const availableShapes = ['star_white_01', 'star_red_01', 'star_orange_01'];
const randomShape = availableShapes[Math.floor(Math.random() * availableShapes.length)];
const [randomShape2, randomShape3] = availableShapes.filter(s => randomShape !== s)

let evils = {
  'star_white_01': true,
  'star_red_01': true,
  'star_orange_01': true
}
export function initShapes() {


  loadAnimations.call(this);


  /** All Game Objects created by this Group will automatically be given dynamic
     * Arcade Physics bodies. 
     * https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Group.html
     * */
  shapes = this.physics.add.group({
    /** 
     * See example to play with acceleration after N seconds
     * http://labs.phaser.io/edit.html?src=src\physics\arcade\angular%20acceleration.js
     */
    // accelerationY: 1000
  })
  
  // Spawn initial shapes
  const shape0 = shapes.create(...spawnCoords[0], randomShape);
  tweakShape(shape0, `${randomShape}_animation`);


  const shape1 = shapes.create(...spawnCoords[1], randomShape2);
  tweakShape(shape1, `${randomShape2}_animation`);

  const shape2 = shapes.create(...spawnCoords[2], randomShape3)
  tweakShape(shape2, `${randomShape3}_animation`);


  // Attach generate random personality shape
  shapes.generatePersonalities = generatePersonalities;

  return shapes
}

export function respawnShapes() {
  // generar de 1 a 3 formas aleatorias en lugares aleatorios.
  // cuadrar que el tiempo entre una colision y otra sea divisible por 130s
  let respawnQuantity = Math.floor(Math.random() * 4)
  
  while (respawnQuantity > 0) {

  const coords = getRandomCoord()
  const name = getRandomShape()
  const shape = shapes.create(...coords, name);
  tweakShape(shape, `${name}_animation`);
  
    respawnQuantity = respawnQuantity - 1
  }

}

function tweakShape(shape, anim) {
  // Resize
  shape.displayHeight = FIG_SIZE;
  shape.displayWidth = FIG_SIZE;

  // textures keys shape are 1 2 3 in the sprite animations so we make it to be 1.
  let key = shape.texture.key.slice(0, -1);
  key = `${key}1`;
  shape.evil = evils[key]

  // Add animation
  shape.play(anim);
}

function loadAnimations() {
  this.anims.create({
    key: 'star_orange_01_animation',
    frames: [
        { key: 'star_orange_01' },
        { key: 'star_orange_02' },
        { key: 'star_orange_03' }
    ],
    frameRate: FIG_FRAME_RATE,
    repeat: -1
  });

  this.anims.create({
    key: 'star_white_01_animation',
    frames: [
        { key: 'star_white_01' },
        { key: 'star_white_02' },
        { key: 'star_white_03' }
    ],
    frameRate: FIG_FRAME_RATE,
    repeat: -1
  });

  this.anims.create({
    key: 'star_red_01_animation',
    frames: [
        { key: 'star_red_01' },
        { key: 'star_red_02' },
        { key: 'star_red_03' }
    ],
    frameRate: FIG_FRAME_RATE,
    repeat: -1
  });
}

function generatePersonalities(shape) {
  setEvils();

  // if theres no a bad guy, try again.
  if (!Object.keys(evils).filter(e => evils[e]).length) {
    return generatePersonalities(shape)
  }

  // textures keys shape are 1 2 3 in the sprite animations so we make it to be 1.
  let key = shape.texture.key.slice(0, -1);
  key = `${key}1`;
  evils[key] = false;

  console.log("EVILS", evils)
  
  shapes.children.iterate(function (shape) {
    shape.evil = evils[shape.texture.key]
  });
}

function getRandomCoord() {
  return spawnCoords[Math.floor(Math.random()*spawnCoords.length)];
}

function getRandomShape() {
  return availableShapes[Math.floor(Math.random() * availableShapes.length)];
}

function setEvils() {
  let rand = {
    'star_white_01': Math.random() >= 0.5,
    'star_red_01': Math.random() >= 0.5,
    'star_orange_01': Math.random() >= 0.5
  }

  evils = rand;
}