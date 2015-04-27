define(function (require) {
    'use strict';
    var Physics = require('common/libs/physicsjs/dist/physicsjs-full');
    var InputCollector = require('models/InputCollector');
    var WorldRenderer = require('models/WorldRenderer');
    var GameWorld = require('common/World');
    var Player = require('common/Player');

    function Game(socket) {
        var clientGame = this;
        clientGame.client = null;
        clientGame.socket = socket;
        clientGame.inputCollector = new InputCollector();
        clientGame.world = new GameWorld();
        clientGame.worldRenderer = new WorldRenderer(clientGame.world);
        clientGame.socket.on('world.player.init', function (player) {
            clientGame.clientId = player.id;
            clientGame.setEventListeners(player);
            var newPlayer = new Player(player.id, player);
            clientGame.world.addPlayer(newPlayer);
        });
        Physics.util.ticker.on(function (time, dt) {
            clientGame.world.simulation.step(time);
        });
        Physics.util.ticker.start();
    }

    Game.prototype.setEventListeners = function (player) {
        var clientGame = this;
        clientGame.socket.on('world.frame', function (snapshot) {
            clientGame.world.restoreStateFromSnapshot(snapshot);
        });

        clientGame.socket.on('world.player.join', function (player) {
            var newPlayer = new Player(player.id, player);
            clientGame.world.addPlayer(newPlayer);
        });

        clientGame.socket.on('world.player.leave', function (player) {
            clientGame.world.removePlayerById(player.id);
        });

        clientGame.inputCollector.onDirectionUpdate(function (direction) {
            clientGame.socket.emit('world.player.move', direction);
            //clientGame.world.processDirectionInput(clientGame.clientId, direction);
        });
    };

    return Game;

});