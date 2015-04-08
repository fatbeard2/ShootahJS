
var config = {
    'socket-io-port': 1339,
    'static-server-port': 8081
};

var gameServer = require('./game-server');
var staticServer = require('./static-server.js');

gameServer(config);
staticServer(config);

