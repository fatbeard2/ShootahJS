define(['models/InputCollector', 'models/WorldRenderer', 'common/World', 'common/Player'], function (InputCollector, WorldRenderer, GameWorld, Player) {
    'use strict';

    function Game(socket) {
        var clientGame = this;
        clientGame.client = null;
        clientGame.socket = socket;
        clientGame.inputCollector = new InputCollector();
        clientGame.world = new GameWorld();
        clientGame.worldRenderer = new WorldRenderer(clientGame.world);
        clientGame.socket.on('world.player.init', function (player) {
            clientGame.setEventListeners(player);
            var newPlayer = new Player(player.id);
            clientGame.world.addPlayer(newPlayer);
        });
    }

    Game.prototype.setEventListeners = function (player) {
        var clientGame = this;
        clientGame.clientId = player.id;
        clientGame.socket.on('world.frame', function (snapshot) {
            clientGame.world.restoreStateFromSnapshot(snapshot);
        });

        clientGame.socket.on('world.player.join', function (player) {
            var newPlayer = new Player(player.id);
            clientGame.world.addPlayer(newPlayer);
        });

        clientGame.socket.on('world.player.leave', function (player) {
            clientGame.world.removePlayerById(player.id);
        });

        clientGame.inputCollector.onDirectionUpdate(function (direction) {
            clientGame.socket.emit('world.player.move', direction);
            clientGame.world.processDirectionInput(clientGame.clientId, direction);
        });
    };

    return Game;

});