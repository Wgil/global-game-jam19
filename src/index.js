import 'phaser';
import {COORDS, GAME_WIDTH, GAME_HEIGHT} from './utils/constants'
import {player, initPlayer} from './player'
import {shapes, initShapes, NAMES as SHAPE_NAMES, respawnShapes} from './shapes'

// https://photonstorm.github.io/phaser3-docs/global.html#GameConfig
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example', //The DOM element that will contain the game canvas, or its id
    width: GAME_WIDTH, // The width of the game, in game pixels.
    height: GAME_HEIGHT, // The height of the game, in game pixels.
    // Physics configuration.
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 130
            }
        },
    },
    // Scenes fns
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let cursors;
let background;

// new
let text;
let timedEvent;



function preload ()
{
    this.load.image('background', 'assets/starfield.png');
    this.load.image(SHAPE_NAMES.square, 'assets/square.png');
    this.load.image(SHAPE_NAMES.circle, 'assets/circle.png');
    this.load.image(SHAPE_NAMES.triangle, 'assets/triangle.png');
}


function create () {   
    // Create image Backgroud
    background = this.add.tileSprite(COORDS.X.center, COORDS.Y.center, GAME_WIDTH, GAME_HEIGHT, 'background');

    // Init player options
    initPlayer.apply(this);
    
    // Init shape options
    initShapes.apply(this);

    // Callback to execute on player collide with shape
    this.physics.add.overlap(player, shapes, collideShape, null, this);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    // Create text
    text = this.add.text(32, 32);


}

function update() {

    // update the position background
    // updateBackground()

    addPlayerMovement.apply(this);

    text.setText('Event.progress: ' );

    // respawnShapes()
    timedEvent = this.time.addEvent({ delay: 4000, callback: onEvent, callbackScope: this, repeat: 3 });

    this.input.on('pointerdown', function () {

        if (timedEvent.paused)
        {
            timedEvent.paused = false;
        }
        else
        {
            timedEvent.paused = true;
        }

    });

}

function updateBackground () {
    background.tilePositionY -= 1;
}

function collideShape(player, shape) {
    // Disable physics after collision
    shape.disableBody(true, true)
  setTimeout(()=> {
    respawnShapes()
  }, 3000);


}

function addPlayerMovement() {
    if (cursors.left.isDown) {
        this.physics.moveTo(player, COORDS.X.left, GAME_HEIGHT, 500)
    }
    else if (cursors.right.isDown) {
        this.physics.moveTo(player, COORDS.X.right, GAME_HEIGHT, 500)
    }
}


function onEvent ()
{
        // background.rotation += 0.004;
        // console.log(background.rotation)
    // respawnShapes()
}