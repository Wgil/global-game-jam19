import 'phaser';
import {COORDS, GAME_WIDTH, GAME_HEIGHT} from './utils/constants'
import {player, initPlayer} from './player'
import {shapes, initShapes, NAMES as SHAPE_NAMES} from './shapes'

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
                y: 300
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

}

function update() {
    // update the position background
    updateBackground()

    if (!player.isAlive()) {
        // Show Game over
        return
    }

    addPlayerMovement.apply(this);
}

function updateBackground () {
    background.tilePositionY -= 1;
}

function collideShape(player, shape) {
    if (!player.isHitten()) {
        player.hitten = true;
        shapes.generatePersonalities(shape);
    }

    if (shape.evil) {
        player.hitPlayer(player)
    } else {
        player.addPoints(player)
    }

    // Disable physics after collision
    shape.disableBody(true, true)
}

function addPlayerMovement() {
    if (cursors.left.isDown) {
        this.physics.moveTo(player, COORDS.X.left, GAME_HEIGHT, 500)
    }
    else if (cursors.right.isDown) {
        this.physics.moveTo(player, COORDS.X.right, GAME_HEIGHT, 500)
    }
}