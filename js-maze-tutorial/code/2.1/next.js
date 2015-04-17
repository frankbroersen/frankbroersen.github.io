var neighbors = [];

// look for the neighbour on the right
if (x + 1 < max_x) {
    neighbors.push({x: x + 1, y: y});
}

// look for the neighbour at the bottom
if (y + 1 < max_y) {
    neighbors.push({x: x, y: y + 1});
}

// look for the neighbour on the left
if (x - 1 > -1) {
    neighbors.push({x: x - 1, y: y});
}

// neighbour on the top
if (y - 1 > -1) {
    neighbors.push({x: x, y: y - 1});
}
    