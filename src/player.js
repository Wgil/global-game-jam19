import {COORDS} from './utils/constants'

const POINTS = 1;
const MAX_HITS = 3;
export let player = null;

export function initPlayer() { 
  player = this.physics.add.image(...COORDS.XY.bottomRight, 'square')
  player.hits = 0;
  player.points = 0;
  player.hitten = false;

  //Attach methods
  player.addPoints = addPoints;
  player.hitPlayer = hitPlayer;
  player.isAlive = isAlive;
  player.isHitten = isHitten;

  player.setCollideWorldBounds(true); // don't go out of the map
}

function isHitten () {
  return player.hitten;
}

function isAlive () {
  return player.hits < MAX_HITS
}

function addPoints() {
  player.points += POINTS
}

function hitPlayer() {
  player.hits+= 1
}