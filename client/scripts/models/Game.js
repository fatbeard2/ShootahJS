define(['models/InputCollector','models/WorldRenderer','models/GameWorld'], function (InputCollector, WorldRenderer, GameWorld) {
    'use strict';

    function Game(socket) {
        this.client = null;
        this.socket = socket;
        this.inputCollector = new InputCollector();
        this.world = new GameWorld();
        this.worldRenderer = new WorldRenderer(this.world);
        this.world.addPlayer();
        'test'
        this.inputCollector.onDirectionUpdate((function (direction) {
            this.socket.emit('world.player.move', direction);
            this.world.processDirectionInput(this.client, direction);
        }).bind(this));

        this.socket.on('game.init', (function () {
            this.client = new Player();
            this.world.addPlayer(this.client);
        }).bind(this));

        this.socket.on('world.frame', (function (snapshot) {
            this.world.restoreStateFromSnapshot(snapshot);
        }).bind(this));

        this.socket.on('world.player.join', (function (player) {
            this.world.addPlayer(player);
        }).bind(this));

        this.socket.on('world.player.leave', (function (player) {
            this.world.removePlayer(player);
        }).bind(this));
    }

    return Game;

});