import {COORDS, GAME_WIDTH, GAME_HEIGHT} from './utils/constants'

export let shapes = null;

export function initShapes() {
  /** All Game Objects created by this Group will automatically be given dynamic
     * Arcade Physics bodies. 
     * https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.Group.html
     * */
  shapes = this.physics.add.group(
    {
        gravityY: 300
    }
  )

  // Add a square to the group
  shapes.create(...COORDS.XY.center, 'square').setScale(.5);

  return shapes
}