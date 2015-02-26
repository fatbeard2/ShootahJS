define(['pixi', 'lodash'], function (pixi, _) {

    function Game(socket) {
        this.socket = socket;
        this.registerInputCollection();
        this.registerServerInteraction();
    }

    Game.prototype.registerInputCollection = function() {
        //window.addEventListener('keydown', _.throttle(onKeyDown, 200));
        //window.addEventListener('keyup', _.throttle(onKeyUp, 200));
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