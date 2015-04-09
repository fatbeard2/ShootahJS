var Player = require('../common').Player;
var World = require('../common').World;

var players = {};
var playersCount = 0;

function Game(io) {
    this.io = io;
    global.requestAnimationFrame = function () {
        debugger
    }
    this.world = new World();
    setInterval((function () {
        io.emit('world.frame', this.world.takeSnapShot());
    }).bind(this), 100);

    io.on('connect', (function (socket) {
        this.addPlayer(socket);
    }).bind(this));
}


Game.prototype.addPlayer = function (socket) {
    var newPlayer = new Player(socket.id);
    this.world.addPlayer(newPlayer);
    this.setEventListeners(socket);
    this.io.emit('world.player.join', newPlayer.serialize() );
    socket.emit('world.player.init', newPlayer.serialize() );
    players[socket.id] = newPlayer;
    console.warn('connected ' + socket.id + '. Total players: ' + ++playersCount);
};


Game.prototype.removePlayer = function (socket) {
    this.io.emit('world.player.leave', {id: socket.id} );
    this.world.removePlayerById(socket.id);
    console.warn('disconnected ' + socket.id + '. Total players: ' + --playersCount);
};

Game.prototype.setEventListeners = function (socket) {
    var self = this;
    socket.on('disconnect', function () {
        self.removePlayer(socket);
    });

    socket.on('world.player.move', function (data) {
        self.world.processDirectionInput(socket.id, data);
    });
};


module.exports = Game;
