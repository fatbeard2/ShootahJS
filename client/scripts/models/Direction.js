define([] , function () {
    function Direction() {
        if(arguments.length == 1) {
            this.x = arguments[0][0];
            this.y = arguments[0][1];
        } else if (arguments.length == 2) {
            this.x = arguments[0];
            this.y = arguments[1];
        }
    }

    Direction.prototype.isNull = function () {
        return !this.x && !this.y;
    };

    Direction.prototype.isOppositeTo = function (direction) {
        return ((direction.x == -this.x) && this.x) || ((direction.y == -this.y) && this.y);
    };

    Direction.prototype.isDiagonal = function () {
        return this.x && this.y;
    };

    Object.defineProperty(Direction, 'LEFT', {
        get: function () {
            return new Direction(-1,0);
        }
    });

    Object.defineProperty(Direction, 'RIGHT', {
        get: function () {
            return new Direction(1,0);
        }
    });

    Object.defineProperty(Direction, 'DOWN', {
        get: function () {
            return new Direction(0,1);
        }
    });

    Object.defineProperty(Direction, 'UP', {
        get: function () {
            return new Direction(0,-1);
        }
    });

    Object.defineProperty(Direction, 'NULL', {
        get: function () {
            return new Direction(0,0);
        }
    });

    return Direction;
});
