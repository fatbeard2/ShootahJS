var requirejs = require('requirejs');

requirejs.config({
    baseUrl: __dirname,
    nodeRequire: require,
    paths: {
        'physicsjs': 'common/libs/dist/physics'
    }
});
var config = {
    'socket-io-port': 1339,
    'static-server-port': 8081
};

var gameServer = require('./game-server');
var staticServer = require('./static-server');

gameServer(config);
staticServer(config);

