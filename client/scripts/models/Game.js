define(['models/InputCollector','models/Stage'], function (InputCollector, Stage) {
    'use strict';

    function Game(socket) {
        this.socket = socket;
        this.inputCollector = new InputCollector();
        this.stage = new Stage();

        this.inputCollector.onDirectionUpdate((function (direction) {
            this.socket.emit('player.move', direction);
        }).bind(this));

        this.socket.on('game.frame', (function (frame) {
            this.stage.update(frame);
        }).bind(this));

        this.socket.on('game.new_player', (function (player) {
            this.stage.addPlayer(player);
        }).bind(this));
    }

    return Game;

});