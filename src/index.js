import 'phaser';
import {COORDS, GAME_WIDTH, GAME_HEIGHT, PLAYER_SPEED, PARTICLES_QUANTITY, RESPAWN_DELAY} from './utils/constants'
import Game from './game'

let theme;

class SceneA extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'sceneA' });
    }

    preload ()
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

        this.load.audio('theme_start', [
            'assets/music/start_1846.wav'
        ]);

        this.load.audio('menu_theme', [
            'assets/music/menu_theme_la_luz.wav'
        ]);
        
        // FX SOUNDS
        this.load.audio('hit', [
            'assets/sounds/hit.wav'
        ]);

        this.load.audio('point', [
            'assets/sounds/point.wav'
        ]);

        // Loading screen
        var loadingText = this.make.text({x: COORDS.X.center, y: COORDS.Y.center});
        this.load.on('progress', function () {
            loadingText.setText('Loading...');
        });

        this.load.on('complete', () => {
            loadingText.destroy();
        });
    }

    create ()
    {
        theme = this.sound.add('menu_theme');
        var loopMarker = {
            name: 'loopx',
            start: 0,
            config: {
                loop: true
            }
        };
        theme.addMarker(loopMarker);
        theme.play('loopx');


        this.input.manager.enabled = true;

        this.cameras.main.fadeIn(5000, 0, 0, 0, (_, progress) => {
            if (progress !== 1) return;

            this.input.keyboard.on('keydown', () => {
                this.scene.start('Game');
                theme.stop();
    
            }, this);
        });

        // Instructions 
        var instructions = this.add.text(0, COORDS.Y.center);
        instructions.setText(`
            Choose the orb you will bond with and follow them
            throughout the journey.
            `)
    }

}

var config = {
    key: 'game',
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
    scene: [SceneA, Game]
};

var game = new Phaser.Game(config);
