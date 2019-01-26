import {COORDS} from './utils/constants'

export let player = null;

export function initPlayer() { 
  player = this.physics.add.image(...COORDS.XY.bottomRight, 'square').setScale(.5)

  player.setCollideWorldBounds(true); // don't go out of the map
}