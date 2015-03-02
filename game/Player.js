function Player(socket, spec) {
    spec = spec || {};
    this.socket = socket;
    this.id = socket.id;
    this.setX(spec.x || 0);
    this.setY(spec.y || 0);
}

Player.prototype.getX = function () {
    return this.x;
};

Player.prototype.setX = function (newX) {
    if(typeof newX === 'number' && !isNaN(newX)) {
        return this.x = newX;
    } else {
        throw new Error('Attempting to assign not a number to coordinate');
    }
};

Player.prototype.increaseX = function (dx) {
    return this.setX(this.getX() + dx);
};

Player.prototype.getY = function () {
    return this.y;
};

Player.prototype.setY = function (newY) {
    if(typeof newY === 'number' && !isNaN(newY)) {
        return this.y = newY;
    } else {
        throw new Error('Attempting to assign not a number to coordinate');
    }
};

Player.prototype.increaseY = function (dy) {
    return this.setY(this.getY() + dy);
};


module.exports = Player;