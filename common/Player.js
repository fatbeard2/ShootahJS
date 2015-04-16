(function(define) {

    define(function (require) {
        var Physics = require('./libs/physicsjs/dist/physicsjs-full');

        function Player(id, spec) {
            spec = spec || {};
            this.id = id;
            this.body = Physics.body('circle', {
                x: spec.x || 0,
                y:  spec.y || 0,
                vx: spec.vx || 0,
                vy: spec.vy || 0,
                radius: 20
            });
        }

        Player.prototype.move = function (vector) {
            this.body.state.vel.x += vector.x * 0.1;
            this.body.state.vel.y += vector.y * 0.1;
        };

        Player.prototype.serialize = function () {
            var player = this;
            return {
                body: {
                    state: player.body.state
                },
                id: player.id
            }
        };

        Player.prototype.updateState = function (newState) {
            this.body.state.pos = new Physics.vector(newState.body.state.pos);
        };

        return Player;
    });

}( typeof module === 'object' && typeof define !== 'function'
        ? function (factory) { module.exports = factory(require); }
        : define
));


