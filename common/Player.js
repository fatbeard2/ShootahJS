(function(define) {

    define(function (require) {
        var Physics = require('./libs/physicsjs/dist/physicsjs-full');

        function Player(id, spec) {
            spec = spec || Player.initialState();
            this.id = id;
            this.body = Physics.body('circle', {
                radius: 20
            });
            this.updateState(spec);


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
                time: Date.now(),
                id: player.id
            }
        };

        Player.prototype.updateState = function (newState) {
            this.body.state.pos = Physics.vector(newState.body.state.pos);
            this.body.state.vel = Physics.vector(newState.body.state.vel);
            this.body.state.acc = Physics.vector(newState.body.state.acc);
            this.body.state.angular = newState.body.state.angular;
        };

        Player.initialState = function () {
            return {
                body: {
                    state: {
                        pos: Physics.vector(0, 0),
                        vel: Physics.vector(0, 0),
                        acc: Physics.vector(0, 0),
                        angular: {
                            pos: 0,
                            vel: 0,
                            acc: 0
                        }
                    }
                }
            }
        };

        return Player;
    });

}( typeof module === 'object' && typeof define !== 'function'
        ? function (factory) { module.exports = factory(require); }
        : define
));


