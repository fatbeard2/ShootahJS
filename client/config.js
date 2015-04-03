require.config({
    baseUrl: 'scripts',
    paths: {
        'io': 'bower_components/socket.io-client/socket.io',
        'lodash': 'bower_components/lodash/lodash',
        'pixi': 'bower_components/pixi/bin/pixi.dev',
        'physicsjs': 'bower_components/PhysicsJS/dist/physicsjs-full'
    }

});

require(['models/Game', 'socket'], function (Game, socket) {
    var game = new Game(socket);
});