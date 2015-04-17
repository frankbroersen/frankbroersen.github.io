function getStartingPoint(max_y) {
    return {
        x: 0,
        y: rand(0,max_y)
    };
}
var start = getStartingPoint(max_y);