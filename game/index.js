var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Game(options) {
    EventEmitter.call(this);
}

util.inherits(Game, EventEmitter);

Game.prototype.init = function () {
    var self = this;
    self.emit('init');
    setInterval(function () {
        self.emit('frame', {data: 'hi im frame'});
    }, 200);
};

module.exports = Game;