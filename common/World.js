define(['physicsjs'], function (Physics) {
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
        Physics.util.ticker.on(function( time, dt ){
            world.simulation.step( time );
        });
        Physics.util.ticker.start();
    }

    World.prototype.addPlayer = function (player) {
        this.emit('world.player.join', player);
        this.simulation.add(player.body);
        this.players[player.id] = player;
    };

    World.prototype.removePlayerById = function (playerId) {
        this.emit('world.player.leave', playerId);
        this.simulation.remove(this.getPlayerById(playerId).body);
        this.players[playerId] = null;
    };

    World.prototype.getPlayerById = function (playerId) {
        return this.players[playerId];
    };

    World.prototype.processDirectionInput = function (playerId, direction) {
        this.getPlayerById(playerId).move(direction);
    };

    World.prototype.restoreStateFromSnapshot = function (snapshot) {
    };

    World.prototype.takeSnapShot = function (snapshot) {
    };

    //todo move to separate class
    World.prototype.on = function (eventName, callback) {
        if(!this.eventListeners[eventName]) this.eventListeners[eventName] = [];
        this.eventListeners[eventName].push(callback);
    };

    World.prototype.emit = function (eventName, data) {
        if(this.eventListeners[eventName]) {
            this.eventListeners[eventName].forEach(function (listener) {
                setTimeout(function () {
                    listener(data);
                }, 0);
            });
        }
    };

    return World;
});