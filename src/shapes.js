import {COORDS, GAME_WIDTH, GAME_HEIGHT} from './utils/constants'

export let shapes = null;

export const NAMES = {
  triangle: 'triangle',
  square: 'square',
  circle: 'circle'
}

const spawnCoords = [
  COORDS.XY.topLeft,
  COORDS.XY.topCenter, 
  COORDS.XY.topRight
];

const INIT_TIMEOUT = 1846;

const randomCoord = spawnCoords[Math.floor(Math.random()*spawnCoords.length)];
const availableShapes = [NAMES.triangle, NAMES.circle, NAMES.square];
const randomShape = availableShapes[Math.floor(Math.random() * availableShapes.length)];
const [randomShape2, randomShape3] = availableShapes.filter(s => randomShape !== s)

export function initShapes() {
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
  
  shapes.create(...spawnCoords[0], randomShape);
  shapes.create(...spawnCoords[1], randomShape2);
  shapes.create(...spawnCoords[2], randomShape3);

  return shapes
}

const TIMES = 3000;

export function respawnShapes() {
  // generar de 1 a 3 formas aleatorias en lugares aleatorios.
  // cuadrar que el tiempo entre una colision y otra sea divisible por 130s

  // setTimeout(()=> {
    // shapes.create(...spawnCoords[0], randomShape);
    // shapes.create(...spawnCoords[1], randomShape2);
    // shapes.create(...spawnCoords[2], randomShape3);
  // }, TIMES + 3000);


  // setInterval( () => {
        shapes.create(...spawnCoords[0], randomShape);
    shapes.create(...spawnCoords[1], randomShape2);
    shapes.create(...spawnCoords[2], randomShape3);
  // }, 100);

}