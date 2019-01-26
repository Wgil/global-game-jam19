import 'phaser';

export let image0 = null;
export let iter = null;

export function updateBackground () {
    function updateBackgroundPosition (iter) {
        return iter + 1;
    }
    image0.tilePositionY = updateBackgroundPosition(iter);

    // iter += 0.01;
    if(iter == -100 ){
        iter = 0;
    }
    iter -= 1;
}
