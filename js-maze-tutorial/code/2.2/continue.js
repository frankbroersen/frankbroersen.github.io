// find a starting point
var start = getStartingPoint(max_y);

// mark it as visited
markAsVisited(start);

// call the function to find the next point
next(start);

// create a function that gets the next point, and if it finds one, do it again
// after a small timeout.
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
    
    // find the next point, after half a second
    setTimeout(function(){
        next(neighbor);
    },500);

}
