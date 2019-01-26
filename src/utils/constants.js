export const GAME_WIDTH = 576;
export const GAME_HEIGHT = 700;

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
        topLeft: [0, -50],
        topCenter: [GAME_WIDTH / 2, -50],
        topRight: [GAME_WIDTH, -50],
        center: [GAME_WIDTH / 2, GAME_HEIGHT / 2],
        bottomLeft: [0, GAME_HEIGHT],
        bottomMiddle: [GAME_WIDTH / 2, GAME_HEIGHT],
        bottomRight: [GAME_WIDTH, GAME_HEIGHT]
    }
}