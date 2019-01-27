import {COORDS, FIG_SIZE, FIG_FRAME_RATE} from './utils/constants'

const POINTS = 1;
const MAX_HITS = 3;
export let player = null;

export function initPlayer() {
  // Add star anim
  this.anims.create({
    key: 'player_animation',
    frames: [
        { key: 'player_01' },
        { key: 'player_02' },
        { key: 'player_03' }
    ],
    frameRate: FIG_FRAME_RATE,
    repeat: -1
  });

  player = 
    this.physics.add.sprite(...COORDS.XY.bottomRight, 'player_01').play('player_animation');
  player.body.setAllowGravity(false);

  // Resize
  player.displayHeight = FIG_SIZE;
  player.displayWidth = FIG_SIZE;

  // Game config
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