
/**
 * This is the 50/50 version
 */

// define our global variables
var maze_wrapper, visited, max_x, max_y, potential_neighbors, count = 0;

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
 * Find the next point, and repeat this step untill we run out of neighbors
 */
function next(point) {
    // find the neighbors
    var neighbors = findNeighbors(point.x, point.y);

    // and pick a random one
    var neighbor = pickRandomNeighbor(neighbors);

    // if we cannot pick one, return false
    if(neighbor === false) {
        return false;
    }

    // mark it as visited
    markAsVisited(neighbor);
    
    // add the others to the potential neighbors list
    markAsPotential(neighbor, neighbors);

    // remove the borders
    openBorders(point, neighbor);

    // find the next point, after half a second
    setTimeout(function(){
        next(neighbor);
    },50);

}

/**
 * Mark the non-used neighbors as potential
 */
function markAsPotential(chosen_neighbor, neighbors) {
    // loop through all neighbors
    for(var neighbor in neighbors) {
        // if the x and y value is not the same as the chosen one, mark it
        if(neighbors[neighbor].x !== chosen_neighbor.x || neighbors[neighbor].y !== chosen_neighbor.y) {
            // add the 'potential' class
            getElement(neighbors[neighbor].x, neighbors[neighbor].y).addClass('potential');
            // store it as potential, together with the current chosen one
            potential_neighbors[ neighbors[neighbor].x + '_' + neighbors[neighbor].y ] = chosen_neighbor;
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
    if(count.x > count.y && count.y > 0) {
        neighbors.push(option_y);
    }
    if(count.y > count.x && count.x > 0) {
        neighbors.push(option_x);
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
 * Mark a point as visited
 */
function markAsVisited(point) {
    count++;
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
