/**
 * Pick a random neighbor from a given list of neighbors
 */
function pickRandomNeighbor(neighbors) {
    if (!neighbors.length) {
        return false;
    }
    var random = rand(0, neighbors.length);
    return neighbors[random];
}

/**
 * Find the non-visited neighbors of a given point (x, y)
 */
function findNeighbors(x, y) {
    var neighbors = [];
    
    // we count the options on the x and y axis
    var count = {
        x: 0, y: 0
    }, 
    // we store the most recent used x and y option        
    option_x, option_y;
    
    if (x + 1 < max_x && this.isVisited(x + 1, y) === false) {
        option_x = {x: x + 1, y: y};
        neighbors.push(option_x);
        // increase y counter
        count.x++;
    }
    if (y + 1 < max_y && this.isVisited(x, y + 1) === false) {
        option_y = {x: x, y: y + 1};
        neighbors.push(option_y);
        // increase y counter
        count.y++;
    }
    if (x - 1 > -1 && this.isVisited(x - 1, y) === false) {
        option_x = {x: x - 1, y: y};
        neighbors.push(option_x);
        count.x++;
    }
    if (y - 1 > -1 && this.isVisited(x, y - 1) === false) {
        option_y = {x: x, y: y - 1};
        neighbors.push(option_y);
        count.y++;
    }
    
    // if we have y options, and more x then y options
    if(count.x > count.y && count.y > 0) {
        // add the y option again
        neighbors.push(option_y);
    }
    // if we have x options, and more y then x options
    if(count.y > count.x && count.x > 0) {
        // add the x option again
        neighbors.push(option_x);
    }
   
    return neighbors;
}