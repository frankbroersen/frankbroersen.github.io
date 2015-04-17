
var maze;

(function () {

    maze = {
        element: false,
        max_x: false,
        max_y: false,
        start: false,
        current: false,
        size: 0,
        // list visited positions
        visited: {},
        // scheduled for visitation
        schedule: {},
        //
        speed: 10,
        //
        interval: false,
        generate: function (element, x, y) {
            this.element = element;
            this.max_x = x;
            this.max_y = y;
            this.size = x * y;
            this.start = this.current = this.findRandomStartingPoint();
            this.markAsVisited(this.start[0], this.start[1]);
            if (this.start[0] === 0) {
                this.getElement(this.start[0], this.start[1]).addClass('noborder-left');
            } else {
                this.getElement(this.start[0], this.start[1]).addClass('noborder-bottom');
            }
            this.interval = setInterval(function () {
                maze.findNext();
            }, this.speed);
        },
        complete: function () {
            if (this.current[0] + 1 === this.max_x) {
                this.getElement(this.current[0], this.current[1]).addClass('noborder-right');
            } else if (this.current[0] - 1 < 0) {
                this.getElement(this.current[0], this.current[1]).addClass('noborder-left');
            } else if (this.current[1] - 1 < 0) {
                this.getElement(this.current[0], this.current[1]).addClass('noborder-top');
            } else if (this.current[1] - 1 > this.max_y) {
                this.getElement(this.current[0], this.current[1]).addClass('noborder-bottom');
            } else {
                this.findRandomExit();
            }
        },
        findRandomExit: function () {
            this.getElement(this.max_x - 1, rand(0,this.max_y - 1))
                    .addClass('noborder-right');
        },
        findNext: function () {
            var neighbours = this.findNeighbours(this.current[0], this.current[1]);
            var neighbour = this.pickRandomNeighbour(neighbours);
            if (!neighbour) {
                this.findFromSchedule();
                return false;
            }
            this.removeBorderLines(neighbour);
            this.markAsVisited(neighbour[0], neighbour[1]);
            this.current = neighbour;
        },
        findFromSchedule: function () {
            clearInterval(this.interval);
            var keys = Object.keys(this.schedule);
            if (keys.length < 1) {
                this.complete();
                return;
            }
            // the maze is more complex when picking a random point to continue
            var random = rand(0, keys.length); // keys[0]
            var position = this.schedule[keys[random]];
            //var position = this.schedule[keys[0]];    // this will get the first schedule
            this.current = position.previous;
            delete this.schedule[random];
            //delete this.schedule[keys[0]];
            this.current = position;
            this.markAsVisited(position[0], position[1]);
            this.interval = setInterval(function () {
                maze.findNext();
            }, this.speed);
        },
        removeBorderLines: function (position) {
            if (position[0] > this.current[0]) {
                // we went right
                this.getElement(position[0], position[1]).addClass('noborder-left');
                this.getElement(this.current[0], this.current[1]).addClass('noborder-right');
            } else if (position[0] < this.current[0]) {
                // we went left
                this.getElement(position[0], position[1]).addClass('noborder-right');
                this.getElement(this.current[0], this.current[1]).addClass('noborder-left');
            } else if (position[1] > this.current[1]) {
                // we went up
                this.getElement(position[0], position[1]).addClass('noborder-top');
                this.getElement(this.current[0], this.current[1]).addClass('noborder-bottom');
            } else if (position[1] < this.current[1]) {
                // we went down
                this.getElement(position[0], position[1]).addClass('noborder-bottom');
                this.getElement(this.current[0], this.current[1]).addClass('noborder-top');
            }
        },
        getElement: function (x, y) {
            return this.element.find('[data-x="' + x + '"][data-y="' + y + '"]');
        },
        markAsCandidate: function (x, y) {
            this.getElement(x, y)
                    .addClass('candidate');
        },
        markAsVisited: function (x, y) {
            this.getElement(x, y)
                    .addClass('visited');
            this.visited[ this.hashPosition(x, y) ] = true;
            if (this.isScheduled(x, y)) {
                this.unSchedule(x, y);
            }
            return this.isCompleted();
        },
        findNeighbours: function (x, y) {
            var neighbours = [];
            if (x + 1 < this.max_x && this.isVisited(x + 1, y) === false) {
                // right neighbour
                neighbours.push([x + 1, y]);
            }
            if (y + 1 < this.max_y && this.isVisited(x, y + 1) === false) {
                // top neighbour
                neighbours.push([x, y + 1]);
            }
            if (x - 1 > -1 && this.isVisited(x - 1, y) === false) {
                // left neighbour
                neighbours.push([x - 1, y]);
            }
            if (y - 1 > -1 && this.isVisited(x, y - 1) === false) {
                // bottom neighbour
                neighbours.push([x, y - 1]);
            }
            return neighbours;
        },
        pickRandomNeighbour: function (neighbours) {
            if (!neighbours.length) {
                return false;
            }
            var random = rand(0, neighbours.length),
                    neighbour = neighbours[random];
            for (var i in neighbours) {
                if (random !== parseInt(i)) {
                    neighbours[i].previous = neighbour;
                    if (this.isScheduled(neighbours[i][0], neighbours[i][1]) !== true) {
                        this.schedule[this.hashPosition(neighbours[i][0], neighbours[i][1])] = this.current;
                    }
                }
            }
            return neighbour;
        },
        hashPosition: function (x, y) {
            return x + '_' + y;
        },
        isVisited: function (x, y) {
            return typeof this.visited[ this.hashPosition(x, y) ] !== "undefined";
        },
        isScheduled: function (x, y) {
            return typeof this.schedule[ this.hashPosition(x, y) ] !== "undefined";
        },
        unSchedule: function (x, y) {
            delete this.schedule[ this.hashPosition(x, y) ];
        },
        isCompleted: function () {
            return Object.keys(this.visited).length === this.size;
        },
        findRandomStartingPoint: function () {
            if (rand(0, 1) === 1) {
                // random number on y axis
                return [rand(0, this.max_x), 0];
            } else {
                // random number on x axis
                return [0, rand(0, this.max_y)];
            }
        }

    };

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

})();

