function pickRandomPotentialNeighbor() {
    // get the keys from the potential neighbors object
    var keys = Object.keys(potential_neighbors);
    if (keys.length < 1) {
        return false;
    }
    // pick a random key
    var random = rand(0, keys.length);
    // select the neighbor using that key
    var neighbor = potential_neighbors[keys[random]];
    // delete it from the potential neighbors list
    delete potential_neighbors[keys[random]];
    // and return it
    return neighbor;
}

//
var neighbor = pickRandomPotentialNeighbor();

// mark it as visited
markAsVisited(neighbor);

// call the function to find the next point
next(neighbor);