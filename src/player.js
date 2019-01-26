import {COORDS, GAME_WIDTH, GAME_HEIGHT} from './utils/constants'

export let player = null;

export function initPlayer() { 
  player = this.physics.add.image(...COORDS.XY.bottomMiddle, 'square').setScale(.5)

  player.setBounce(0.2); // our player will bounce from items
  player.setCollideWorldBounds(true); // don't go out of the map
}