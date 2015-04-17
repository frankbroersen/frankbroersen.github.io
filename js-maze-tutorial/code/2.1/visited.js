/* the object with visited points */
var visited = {};

/* mark a point as visited */
function markAsVisited(point) {
    
    // add the `visited` class  to the td
    getElement(point.x, point.y).addClass('visited');
    
    // store this point in the visited object
    visited[ point.x + '_' + point.y ] = true;
}
