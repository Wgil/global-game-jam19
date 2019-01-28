import 'phaser';
import {COORDS, GAME_WIDTH, GAME_HEIGHT, PLAYER_SPEED, PARTICLES_QUANTITY, RESPAWN_DELAY} from './utils/constants'
import {player, initPlayer} from './player'
import {shapes, initShapes, respawnShapes} from './shapes'

let cursors;
let background;
let particles;
let text;
let theme;
let theme_start;
let hitSound;
let pointSound;
let gameOver;

export default class Game extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Game' });
    }

    create() {
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
        this.cameras.main.fadeIn(2500);

        // Create text
        text = this.add.text(32, 32);

        // Create game over text
        gameOver = this.add.text(240, COORDS.Y.center);

        // Init player options
        initPlayer.apply(this);

        // Init shape options
        initShapes.apply(this);

        // Callback to execute on player collide with shape
        this.physics.add.overlap(player, shapes, collideShape, null, this);

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();

        // Restart the scene after player is dead
        this.input.keyboard.on('keydown', function () {
            if (player.isAlive()) return;
            theme.stop();
            this.scene.restart();    
        }, this);
    }

    update() {
        // update background position
        updateBackground()

        // Show Game over
        if (!player.isAlive()) {
            // Disable physics after collision
            player.disableBody(true, false)
            
            gameOver.setText("The end of the journey.");

            return
        }

        addPlayerMovement.apply(this);
    }
}

function updateBackground () {
    background.tilePositionY -= 1;
}

function collideShape(player, shape) {
    if (!player.isHitten()) {

        player.hitten = true;
        player.addPoints(player);
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

    text.setText(`Bonded: ${player.points}`);
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