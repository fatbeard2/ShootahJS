var Game = require('./server/Game');
var serveStatic = require('serve-static');

module.exports = function (config) {
    var port = config['app-port'];
    var server = require('connect')(),
        serveClientDirectory = serveStatic('./client'),
        serveCommonDirectory = serveStatic('./common');

    var io = require('socket.io')(server);
    var game = new Game(io);
    server
        .use(serveClientDirectory)
        .use('/common', serveCommonDirectory)
        .listen(port);

    console.log('Static server up and running on port ' + config['static-server-port']);
};


