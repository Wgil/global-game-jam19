export const GAME_WIDTH = 576;
export const GAME_HEIGHT = 700;
export const FIG_SIZE = 130;
export const FIG_FRAME_RATE = 5.5;

const offsetX = 66;
const offsetY = 110;

export const COORDS = {
    X: {
        left: 0,
        center: GAME_WIDTH / 2,
        right: GAME_WIDTH
    },
    Y: {
        center: GAME_HEIGHT / 2
    },
    XY: {
        topLeft: [offsetX, -offsetY],
        topCenter: [GAME_WIDTH / 2, -offsetY],
        topRight: [GAME_WIDTH - offsetX, -offsetY],
        center: [GAME_WIDTH / 2, GAME_HEIGHT / 2],
        bottomLeft: [offsetX, GAME_HEIGHT - offsetY],
        bottomMiddle: [GAME_WIDTH / 2, GAME_HEIGHT - offsetY],
        bottomRight: [GAME_WIDTH - offsetX, GAME_HEIGHT - offsetY]
    }
}

export const PLAYER_SPEED = 500;

export const PARTICLES_QUANTITY = [0, 7, 12];

export const RESPAWN_DELAY = 2000;