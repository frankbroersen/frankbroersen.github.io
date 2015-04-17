function findNeighbors(x, y) {
    var neighbors = [];
    
    // we count the options on the x and y axis
    var count = {
        x: 0, y: 0
    }, 
            
    // we store the most recent used x and y option        
    option_x, option_y;
    
    if (x + 1 < max_x && isVisited(x + 1, y) === false) {
        option_x = {x: x + 1, y: y};
        neighbors.push(option_x);
        // increase y counter
        count.x++;
    }
    // ... and so on for the other options
    
    // if we have y options, and more x then y options
    if(count.x > count.y && count.y > 0) {
        // add the y option again to make the chance equal
        neighbors.push(option_y);
    }
    
    // ... and the same for the other way around
    if(count.y > count.x && count.x > 0) {
        neighbors.push(option_x);
    }
   
    return neighbors;
}