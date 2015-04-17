var potential_neighbors = {};

// find the neighbors
var neighbors = findNeighbors(point.x, point.y);

// and pick a random one
var neighbor = pickRandomNeighbor(neighbors);

// add the others to the potential neighbors list
markAsPotential(neighbor, neighbors);

// mark a point as potential
function markAsPotential(chosen_neighbor, neighbors) {
    // loop through all neighbors
    for(var neighbor in neighbors) {
        // if the x or y value is not the same as the chosen one, mark it
        if(neighbors[neighbor].x !== chosen_neighbor.x || neighbors[neighbor].y !== chosen_neighbor.y) {
            // add the 'potential' class
            getElement(neighbors[neighbor].x, neighbors[neighbor].y).addClass('potential');
            // add the chosen one, so we later can remove the border
            neighbors[neighbor].chosen = chosen_neighbor;
            // store it as potential, together with the current chosen one
            potential_neighbors[ neighbors[neighbor].x + '_' + neighbors[neighbor].y ] = neighbors[neighbor];
        }
    }
}