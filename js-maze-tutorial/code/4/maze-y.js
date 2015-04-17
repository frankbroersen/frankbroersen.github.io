
/**
 * This is the 50/50 version
 */

// define our global variables
var maze_wrapper, visited, max_x, max_y, potential_neighbors;

$(function() {

    // select the maze wrapper
    maze_wrapper = $('#maze');

    // set the size of the grid
    max_x = 25;
    max_y = 25;

    // render the grid
    var html = renderMazeWrapper(max_x, max_y);

    // render the grid    
    maze_wrapper.html(html);

    // object for storing visited points
    visited = {};
    
    // object for storing potential neighbors
    potential_neighbors = {};

    // find a starting point
    var start = getStartingPoint(max_y);

    // mark it as visited
    markAsVisited(start);

    // call the function to find the next point
    next(start);

});

/**
 * Complete the maze
 */
function finish() {
    var rand_y = rand(0, max_y);
    getElement(0, rand_y).addClass('no-border-left').html('<div class=start></div>');
    //
    var rand_y = rand(0, max_y);
    getElement(max_x - 1, rand_y).addClass('no-border-right').html('<div class=end></div>');
}

/**
 * Find the next point, and repeat this step untill we run out of neighbors
 */
function next(point) {
    // find the neighbors
    var neighbors = findNeighbors(point.x, point.y);

    // and pick a random one
    var neighbor = pickRandomNeighbor(neighbors);

    // if we cannot pick one, return false
    if(neighbor === false) {
        neighbor = pickRandomPotentialNeighbor();
        if(!neighbor) {
            // 
            finish();
            return false;
        }
        // set the starting point, for removing the border later on
        point = neighbor.chosen;
    }

    // mark it as visited
    markAsVisited(neighbor);
    
    // add the others to the potential neighbors list
    markAsPotential(neighbor, neighbors, point);
    
    // remove it from the list of potential neighbors, if it is one
    if(!isPotentialNeighbor(neighbor)) {
        delete potential_neighbors[neighbor.x + '_' + neighbor.y];
    }

    // remove the borders
    openBorders(point, neighbor);

    // find the next point, after half a second
    setTimeout(function(){
        next(neighbor);
    },50);

}

/**
 * Pick a random potential neighbor
 */
function pickRandomPotentialNeighbor() {
    var keys = Object.keys(potential_neighbors);
    if (keys.length < 1) {
        return false;
    }
    var random = rand(0, keys.length);
    var key = keys[random];
    var neighbor = potential_neighbors[key];
    return neighbor;
}

/**
 * Mark the non-used neighbors as potential
 */
function markAsPotential(chosen_neighbor, neighbors, original_point) {
    // loop through all neighbors
    for(var neighbor in neighbors) {
        // skip, if it is already a potential neighbor
        if(isPotentialNeighbor(neighbors[neighbor])) {
            continue;
        }
        // if the x and y value is not the same as the chosen one, mark it
        if(neighbors[neighbor].x !== chosen_neighbor.x || neighbors[neighbor].y !== chosen_neighbor.y) {
            // add the 'potential' class
            getElement(neighbors[neighbor].x, neighbors[neighbor].y).addClass('potential');
            // add the chosen one
            neighbors[neighbor].chosen = original_point;
            // store it as potential, together with the current chosen one
            potential_neighbors[ neighbors[neighbor].x + '_' + neighbors[neighbor].y ] = neighbors[neighbor];
        }
    }
}

/**
 * Remove the borders between the current position, and the chosen neighbor
 */
function openBorders(current, neighbor) {
    if (neighbor.x > current.x) {
        getElement(neighbor.x, neighbor.y).addClass('no-border-left');
        getElement(current.x, current.y).addClass('no-border-right');
    } else if (neighbor.x < current.x) {
        getElement(neighbor.x, neighbor.y).addClass('no-border-right');
        getElement(current.x, current.y).addClass('no-border-left');
    } else if (neighbor.y > current.y) {
        getElement(neighbor.x, neighbor.y).addClass('no-border-top');
        getElement(current.x, current.y).addClass('no-border-bottom');
    } else if (neighbor.y < current.y) {
        getElement(neighbor.x, neighbor.y).addClass('no-border-bottom');
        getElement(current.x, current.y).addClass('no-border-top');
    }
}

/**
 * Get a starting point
 */
function getStartingPoint(max_y) {
    return {
        x: 0,
        y: rand(0,max_y)
    };
}

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
    var neighbors = [], count = {x: 0, y: 0}, option_x, option_y;
    if (x + 1 < max_x && isVisited(x + 1, y) === false) {
        option_x = {x: x + 1, y: y};
        neighbors.push(option_x);
        count.x++;
    }
    if (y + 1 < max_y && isVisited(x, y + 1) === false) {
        option_y = {x: x, y: y + 1};
        neighbors.push(option_y);
        count.y++;
    }
    if (x - 1 > -1 && isVisited(x - 1, y) === false) {
        option_x = {x: x - 1, y: y};
        neighbors.push(option_x);
        count.x++;
    }
    if (y - 1 > -1 && isVisited(x, y - 1) === false) {
        option_y = {x: x, y: y - 1};
        neighbors.push(option_y);
        count.y++;
    }
    if(count.x === 1 && count.y === 1) {    // x == 1, so we want to have 3 y
        neighbors.push(option_y);
        neighbors.push(option_y);
    }
    if(count.x === 1 && count.y === 2) {    // x == 1, so we want to have 3 y
        neighbors.push(option_y);
    }
    if(count.x === 2 && count.y === 1) {    // x == 2, so we want to have 6 y
        neighbors.push(option_y);
        neighbors.push(option_y);
        neighbors.push(option_y);
        neighbors.push(option_y);
        neighbors.push(option_y);
    }
    return neighbors;
}

/**
 * Check if a given point is not yet visited
 */
function isVisited(x, y) {
    return typeof visited[ x + '_' + y ] !== "undefined" ? true : false;
}

/**
 * Check if a given point is a potential neighbor
 */
function isPotentialNeighbor(x, y) {
    // delete potential_neighbors[ x + '_' + y ];
    return typeof potential_neighbors[ x + '_' + y ] !== "undefined" ? true : false;
}

/**
 * Mark a point as visited
 */
function markAsVisited(point) {
    getElement(point.x, point.y).addClass('visited')
                                .removeClass('potential');
    visited[ point.x + '_' + point.y ] = true;
}

/**
 * Get an jQuery object of a maze point (x, y)
 */
function getElement(x, y) {
    return maze_wrapper.find('td[data-x="' + x + '"][data-y="' + y + '"]');
}

/**
 * Generate a random number
 */
function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Render the maze wrapper, returns the html of the maze
 */
function renderMazeWrapper(max_x, max_y) { 
    var html = '<table class="table"><tbody>';
    for(var y = 0; y < max_y; y++) {
        html += '<tr>';
        for(var x = 0; x < max_x; x++) {
            html += '<td data-x="' + x + '" data-y="' + y + '"></td>';
        }
        html += '</tr>';
    }
    html += '</tbody></table>';
    return html;
}
