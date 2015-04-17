function pickRandomNeighbor(neighbors) {
    // return false, if there are none
    if (!neighbors.length) {
        return false;
    }
    // random key
    var random = rand(0, neighbors.length);
    // return this neighbor
    return neighbors[random];
}

// find the neighbors
var neighbors = findNeighbours(start);

// and pick one
var neighbor = pickRandomNeighbor(neighbors);