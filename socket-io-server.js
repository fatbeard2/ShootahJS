var Game = require('./game');

module.exports = function (config) {
    var port = config['socket-io-port'];
    var io = require('socket.io')(port);
    var game = new Game();
    game.init();
    game.on('frame', function (frame) {
        io.emit('/game/frame', frame);
    });
    console.warn('Socket-io server up and running on port ' + port);
};
