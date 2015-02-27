var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Game(options) {
    EventEmitter.call(this);
}

util.inherits(Game, EventEmitter);

Game.prototype.init = function (io) {
    var self = this;
    self.emit('game.init');
    setInterval(function () {
        io.emit('/game/frame', {data: 'frame_data'});
    }, 200);
    io.on('player.move', function (data) {
        console.warn(data);
    })

};

module.exports = Game;