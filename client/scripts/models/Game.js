define([
    'pixi',
    'lodash',
    'models/InputCollector',
    'models/Stage'
], function (pixi, _, InputCollector, Stage) {

    function Game(socket) {
        this.socket = socket;
        this.inputCollector = new InputCollector();
        this.inputCollector.onInputUpdate((function (direction) {
            this.socket.emit('player.move', direction);
        }).bind(this))
    }

    return Game;

});