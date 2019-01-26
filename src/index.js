import 'phaser';
import {COORDS, GAME_WIDTH, GAME_HEIGHT} from './utils/constants'
import {player, initPlayer} from './player'
import {shapes, initShapes} from './shapes'

// https://photonstorm.github.io/phaser3-docs/global.html#GameConfig
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example', //The DOM element that will contain the game canvas, or its id
    width: GAME_WIDTH, // The width of the game, in game pixels.
    height: GAME_HEIGHT, // The height of the game, in game pixels.
    // Physics configuration.
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var cursors;

function preload ()
{
    this.load.image('square', 'assets/square.png');
}


function create ()
{   
    // Init player options
    initPlayer.apply(this);
    
    // Init shape options
    initShapes.apply(this);

    // Callback to execute on player collide with shape
    this.physics.add.overlap(player, shapes, collideShape, null, this);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    
}

function update() {
    if (cursors.left.isDown) {
        player.body.setVelocityX(-160);
    }
    else if (cursors.right.isDown) {
        player.body.setVelocityX(160);
    }
}

function collideShape(player, shape) {
    // Disable physics after collision
    shape.disableBody(true, true)
}

