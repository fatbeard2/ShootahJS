var animationLoop;
global.requestAnimationFrame = function (func) {
    if(!animationLoop) animationLoop = setInterval(func, 17);
};
var Game = require('./server/Game');

module.exports = function (config) {
    var port = config['socket-io-port'];
    var io = require('socket.io')(port);
    var game = new Game(io);
    console.warn('Socket-io server up and running on port ' + port);
};
