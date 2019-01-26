export const GAME_WIDTH = 468;
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
        center: [GAME_WIDTH / 2, GAME_HEIGHT / 2],
        bottomLeft: [0, GAME_HEIGHT],
        bottomMiddle: [GAME_WIDTH / 2, GAME_HEIGHT],
        bottomRight: [GAME_WIDTH, GAME_HEIGHT]
    }
}