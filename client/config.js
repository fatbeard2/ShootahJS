require.config({
    paths: {
        'io': 'bower_components/socket.io-client/socket.io',
        'lodash': 'bower_components/lodash/lodash',
        'pixi': 'bower_components/pixi/bin/pixi.dev',
        'physicsjs': '/common/physicsjs/dist/physicsjs-full'
    }
});

require(['models/Game', 'socket'], function (Game, socket) {
    var game = new Game(socket);
});