var Player = require('./Player');
var players = {};
var playersCount = 0;

function Game(options) {
}



Game.prototype.init = function (io) {
    this.io = io;
    io.emit('game.init');

    setInterval((function () {
        io.emit('game.frame', this.getFrame());
    }).bind(this), 100);

    io.on('connect', (function (socket) {
        this.addPlayer(socket);
    }).bind(this));
};

Game.prototype.addPlayer = function (socket) {
    players[socket.id] = new Player(socket);
    console.warn('connected ' + socket.id + '. Total players: ' + ++playersCount);
    this.setEventListeners(socket);
    this.io.emit('game.new_player', {x: players[socket.id].getX(), y: players[socket.id].getY()} )
};


Game.prototype.removePlayer = function (socket) {
    players[socket.id] = undefined;
    console.warn('disconnected ' + socket.id + '. Total players: ' + --playersCount);
};

Game.prototype.setEventListeners = function (socket) {
    var self = this;
    socket.on('disconnect', function () {
        self.removePlayer(socket);
    });

    socket.on('player.move', function (data) {
        players[socket.id].increaseX(data.x);
        players[socket.id].increaseY(data.y);
    });
};

Game.prototype.getFrame = function () {
    var frame = {
        players: []
    };
    for (var id in players) {
        if (players[id]) frame.players.push({x: players[id].getX(), y: players[id].getY()});
    }
    //console.dir(frame);
    return frame;
};

module.exports = Game;