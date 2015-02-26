define([
    'pixi',
    'lodash',
    'models/InputCollector',
    'models/Stage'
], function (pixi, _, InputCollector, Stage) {

    function Game(socket) {
        this.socket = socket;
        this.inputCollector = new InputCollector(socket);
//        this.stage = new Stage(socket);
    }

    Game.prototype.registerInputCollection = function() {
        window.addEventListener('keydown', _.throttle(this.onKeyDown, 200));
        window.addEventListener('keyup', _.throttle(this.onKeyUp, 200));
    };

    Game.prototype.registerServerInteraction = function() {
        var self = this;
        this.socket.on('/game/frame', function (frame) {
            self.redrawFrame(frame);
        });
    };

    Game.prototype.redrawFrame = function (frame) {
        console.info(frame);
    };

    return Game;

});