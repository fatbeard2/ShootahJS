define(['pixi'], function (pixi) {

    function Game(socket) {
        this.socket = socket;
        this.registerInputCollection(socket);
        this.registerServerInteraction(socket);
    }

    Game.prototype.registerInputCollection = function() {

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