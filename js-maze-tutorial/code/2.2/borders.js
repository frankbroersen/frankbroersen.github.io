function openBorders(current, neighbor) {
    if (neighbor.x > current.x) {
        // we went right
        getElement(neighbor.x, neighbor.y).addClass('no-border-left');
        getElement(current.x, current.y).addClass('no-border-right');
    } else if (neighbor.x < current.x) {
        // we went left
        getElement(neighbor.x, neighbor.y).addClass('no-border-right');
        getElement(current.x, current.y).addClass('no-border-left');
    } else if (neighbor.y > current.y) {
        // we went up
        getElement(neighbor.x, neighbor.y).addClass('no-border-top');
        getElement(current.x, current.y).addClass('no-border-bottom');
    } else if (neighbor.y < current.y) {
        // we went down
        getElement(neighbor.x, neighbor.y).addClass('no-border-bottom');
        getElement(current.x, current.y).addClass('no-border-top');
    }
}