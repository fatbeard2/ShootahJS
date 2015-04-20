
var config = {
    'app-port': 8081
};

var gameServer = require('./game-server');
//var staticServer = require('./static-server.js');

gameServer(config);
//staticServer(config);

