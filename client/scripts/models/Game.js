define(['models/InputCollector','models/WorldRenderer','models/GameWorld'], function (InputCollector, WorldRenderer, GameWorld) {
    'use strict';

    function Game(socket) {
        this.socket = socket;
        this.inputCollector = new InputCollector();
        this.world = new GameWorld();
        this.worldRenderer = new WorldRenderer(this.world);

        this.inputCollector.onDirectionUpdate((function (direction) {
            this.socket.emit('player.move', direction);
            this.world.processClientInput(direction);
        }).bind(this));

        this.socket.on('game.frame', (function (snapshot) {
            this.world.restoreStateFromSnapshot(snapshot);
        }).bind(this));

        this.socket.on('game.newPlayer', (function (player) {
            this.world.addPlayer(player);
        }).bind(this));

        this.socket.on('game.playerLeft', (function (player) {
            this.world.removePlayer(player);
        }).bind(this));
    }

    return Game;

});