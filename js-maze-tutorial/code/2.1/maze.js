

// define our global variables
var maze_wrapper, visited, max_x, max_y;

$(function() {
    
    // select the maze wrapper
    maze_wrapper = $('#maze');

    // set the size of the grid
    max_x = 30;
    max_y = 30;

    // render the grid
    var html = renderMazeWrapper(max_x, max_y);

    // render the grid    
    maze_wrapper.html(html);

    // object for storing visited points
    visited = {};

    // find a starting point
    var start = getStartingPoint(max_y);
    
    // mark it as visited
    markAsVisited(start);
    
    // find the neighbors
    var neighbors = findNeighbors(start.x, start.y);

    // and pick a random one
    var neighbor = pickRandomNeighbor(neighbors);
    
    // mark it as visited
    markAsVisited(neighbor);

});

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
 * Check if a given point is not yet visited
 */
function isVisited(x, y) {
    return typeof visited[ x + '_' + y ] !== "undefined" ? true : false;
}

/**
 * Find the non-visited neighbors of a given point (x, y)
 */
function findNeighbors(x, y) {
    var neighbors = [];
    if (x + 1 < max_x && isVisited(x + 1, y) === false) {
        neighbors.push({x: x + 1, y: y});
    }
    if (y + 1 < max_y && isVisited(x, y + 1) === false) {
        neighbors.push({x: x, y: y + 1});
    }
    if (x - 1 > -1 && isVisited(x - 1, y) === false) {
        neighbors.push({x: x - 1, y: y});
    }
    if (y - 1 > -1 && isVisited(x, y - 1) === false) {
        neighbors.push({x: x, y: y - 1});
    }
    return neighbors;
}

/**
 * Mark a point as visited
 */
function markAsVisited(point) {
    getElement(point.x, point.y).addClass('visited');
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
