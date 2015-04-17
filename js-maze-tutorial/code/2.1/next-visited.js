function isVisited(x, y) {
    // return true, if the requested x and y exists, we return true
    return typeof visited[ x + '_' + y ] !== "undefined" ? true : false;
}

function findNeighbors(x, y) {
    
    // we will return a list of neighbors
    var neighbors = [];
    
    // look for the neighbour on the right
    if (x + 1 < max_x && this.isVisited(x + 1, y) === false) {
        neighbors.push({x: x + 1, y: y});
    }
    
    // look for the neighbour at the bottom
    if (y + 1 < max_y && this.isVisited(x, y + 1) === false) {
        neighbors.push({x: x, y: y + 1});
    }
    
    // look for the neighbour on the left
    if (x - 1 > -1 && this.isVisited(x - 1, y) === false) {
        neighbors.push({x: x - 1, y: y});
    }
    
    // neighbour on the top
    if (y - 1 > -1 && this.isVisited(x, y - 1) === false) {
        neighbors.push({x: x, y: y - 1});
    }
    
    // return the list of neighbors
    return neighbors;
}