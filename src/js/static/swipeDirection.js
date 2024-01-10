let lastX = 0;
let lastY = 0;
let direction = null;

export const getSwipeDirection = (e) => {
    let currentX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    let currentY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

    if (currentY > lastY) {
        direction = 'down';
    }
    else if (currentY < lastY) {
        direction = 'up';
    }
    lastY = currentY;

    if (currentX > lastX) {
        direction = 'right';
    }
    else if (currentX < lastX) {
        direction = 'left';
    }

    lastX = currentX;

    return direction;
}