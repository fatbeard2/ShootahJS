var Game = require('./server/Game');

module.exports = function (config) {
    var port = config['socket-io-port'];
    var io = require('socket.io')(port);
    var game = new Game();
    game.init(io);
    console.warn('Socket-io server up and running on port ' + port);
};
