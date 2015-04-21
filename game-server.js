var Game = require('./server/Game');
var express = require('express');
var http = require('http');

module.exports = function (config) {
    var port = config['app-port'];

    var app = express();
    app
        .use(express.static('client'))
        .use('/common', express.static('common'));


    var server = http.createServer(app);
    var io = require('socket.io').listen(server);
    var game = new Game(io);

    server.listen(port, function () {
        console.log('Game server up and running on port ' + port);
    });

};


