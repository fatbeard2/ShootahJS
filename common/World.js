(function(define) {

    define(function (require) {
        var Physics = require('./libs/physicsjs/dist/physicsjs-full');
        var Player = require('./Player');

        function World() {
            var world = this;
            world.eventListeners = {};
            world.players = {};
            world.simulation = Physics();
            world.hieght = 500;
            world.width = 500;
            var viewportBounds = Physics.aabb(0, 0, world.width, world.hieght);
            var edgeCollisions = Physics.behavior('edge-collision-detection', {
                aabb: viewportBounds,
                restitution: 0.1,
                cof: 0.8
            });
            world.simulation.add([
                Physics.behavior('constant-acceleration'),
                Physics.behavior('body-impulse-response'),
                Physics.behavior('body-collision-detection'),
                Physics.behavior('sweep-prune'),
                edgeCollisions
            ]);
        }

        World.prototype.addPlayer = function (player) {
            var world = this;
            world.simulation.add(player.body);
            world.players[player.id] = player;
        };

        World.prototype.removePlayerById = function (playerId) {
            var world = this;
            world.simulation.remove(world.getPlayerById(playerId).body);
            delete world.players[playerId];
        };

        World.prototype.getPlayerById = function (playerId) {
            var world = this;
            return world.players[playerId];
        };

        World.prototype.processDirectionInput = function (playerId, direction) {
            var world = this;
            world.getPlayerById(playerId).move(direction);
        };

        World.prototype.restoreStateFromSnapshot = function (snapshot) {
            var world = this;
            snapshot.players.forEach(function (playerState) {
                var playerToUpdate = world.getPlayerById(playerState.id);
                if (playerToUpdate) {
                    playerToUpdate.updateState(playerState);
                } else {
                    var newPlayer = new Player(playerState.id, playerState);
                    world.addPlayer(newPlayer);
                }
            })
        };

        World.prototype.takeSnapShot = function () {
            var world = this;
            var frame = { players: [] };
            for (var id in world.players) {
                if (world.players.hasOwnProperty(id)) {
                    frame.players.push(world.players[id].serialize());
                }
            }
            return frame;
        };

        return World;
    });

}( typeof module === 'object' && typeof define !== 'function'
        ? function (factory) { module.exports = factory(require); }
        : define
));


