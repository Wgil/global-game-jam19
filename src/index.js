import 'phaser';
import {COORDS, GAME_WIDTH, GAME_HEIGHT, PLAYER_SPEED, PARTICLES_QUANTITY, RESPAWN_DELAY} from './utils/constants'
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
            debug: false,
            gravity: {
                y: 350
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
let particles;
// new
let text;
let timedEvent;
let theme;
let theme_start;
let hitSound;
let pointSound;


function preload ()
{
    // background
    this.load.image('background', 'assets/background/space_bk.png');

    // enemies
    this.load.image('star_orange_01', 'assets/shapes/stars/star_orange01.png');
    this.load.image('star_orange_02', 'assets/shapes/stars/star_orange02.png');
    this.load.image('star_orange_03', 'assets/shapes/stars/star_orange03.png');

    this.load.image('star_white_01', 'assets/shapes/stars/star_white01.png');
    this.load.image('star_white_02', 'assets/shapes/stars/star_white02.png');
    this.load.image('star_white_03', 'assets/shapes/stars/star_white03.png');

    this.load.image('star_red_01', 'assets/shapes/stars/star_red01.png');
    this.load.image('star_red_02', 'assets/shapes/stars/star_red02.png');
    this.load.image('star_red_03', 'assets/shapes/stars/star_red03.png');

    
    // FX particles
    this.load.image('spark', 'assets/fx/blue.png');

    // player
    this.load.image('player_01', 'assets/shapes/stars/star_blue01.png');
    this.load.image('player_02', 'assets/shapes/stars/star_blue02.png');
    this.load.image('player_03', 'assets/shapes/stars/star_blue03.png');

    // MUSIC
    this.load.audio('theme', [
        'assets/music/Level_Theme_Carrera_de_luz.wav'
    ]);

    this.load.audio('theme_start', [
        'assets/music/start_1846.wav'
    ]);
    
    // FX SOUNDS
    this.load.audio('hit', [
        'assets/sounds/hit.wav'
    ]);

    this.load.audio('point', [
        'assets/sounds/point.wav'
    ]);

}



function create () {   
    // Create image Backgroud
    background =
        this.add.tileSprite(COORDS.X.center, COORDS.Y.center, GAME_WIDTH, GAME_HEIGHT, 'background');

    // ADD MUSIC
    theme = this.sound.add('theme');
    var loopMarker = {
        name: 'loop',
        start: 0,
        config: {
            loop: true
        }
    };
    theme.addMarker(loopMarker);

    hitSound = this.sound.add('hit');
    pointSound = this.sound.add('point');
    theme_start = this.sound.add('theme_start');
    theme_start.play();

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
    updateBackground()

    if (!player.isAlive()) {
        // Disable physics after collision
        player.disableBody(true, false)

        // Show Game over
        return
    }

    addPlayerMovement.apply(this);

    text.setText('Event.progress: ' );

}

function updateBackground () {
    background.tilePositionY -= 1;
}

function collideShape(player, shape) {
    if (!player.isHitten()) {


        player.hitten = true;
        shapes.generatePersonalities(shape);
        initParticles.call(this)

        theme.play('loop');
        pointSound.play();

        // Respawn shapes loop
        this.time.addEvent({ delay: RESPAWN_DELAY, callback: respawnShapes, callbackScope: this, loop: true });

    } else {
        if (shape.evil) {
            player.hitPlayer(player)
            hitSound.play();
        } else {
            player.addPoints(player);
            pointSound.play();
        }

        var quantity = PARTICLES_QUANTITY[2];
        switch (player.hits) {
            case 0:
                quantity = PARTICLES_QUANTITY[2];
                break;
            case 1:
                quantity = PARTICLES_QUANTITY[1];
                break;
            case 2:
                quantity = PARTICLES_QUANTITY[0];
                break;
            default:
                quantity = PARTICLES_QUANTITY[0];
        }
        
        console.log("HITS:", player.hits)
        console.log("POINTS", player.points)

        setParticles(quantity)
    }

    // Disable physics after collision
    shape.disableBody(true, true)
}

function addPlayerMovement() {
    // add ease in movement or something
    if (cursors.left.isDown) {
        this.physics.moveTo(player, COORDS.X.left, player.y, PLAYER_SPEED)
        
    }
    else if (cursors.right.isDown) {
        this.physics.moveTo(player, COORDS.X.right, player.y, PLAYER_SPEED)
    }

    particles && particles.setPosition(player.x, player.y);
}

function initParticles() {
    particles = this.add.particles('spark').createEmitter({
        x: player.x,
        y: player.y,
        blendMode: 'SCREEN',
        scale: { start: 0.2, end: 0 },
        speed: { min: -100, max: 100 },
        quantity: PARTICLES_QUANTITY[2]
    });
}

function setParticles(quantitiy) {
    particles.setQuantity(quantitiy);
}