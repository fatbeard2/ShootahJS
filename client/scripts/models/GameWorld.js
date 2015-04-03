define(['physicsjs'], function (Physics) {
    'use strict';
    //todo maybe rename into World class
    var eventListeners = {};
    function GameWorld() {
        var world = this;
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

    GameWorld.prototype.addPlayer = function (player) {
        this.emit('world.player.join', player);
        this.simulation.add(player.body);
        this.players[player.id] = player;
    };

    GameWorld.prototype.removePlayerById = function (playerId) {
        this.emit('world.player.leave', playerId);
        this.simulation.remove(this.getPlayerById(playerId).body);
        this.players[playerId] = null;
    };

    GameWorld.prototype.getPlayerById = function (playerId) {
        return this.players[playerId];
    };

    GameWorld.prototype.processDirectionInput = function (playerId, direction) {
        this.getPlayerById(playerId).move(direction);
    };

    GameWorld.prototype.restoreStateFromSnapshot = function (snapshot) {

    };

    GameWorld.prototype.takeSnapShot = function (snapshot) {

    };

    GameWorld.prototype.on = function (eventName, callback) {
        if(!eventListeners[eventName]) eventListeners[eventName] = [];
        eventListeners[eventName].push(callback);
    };

    GameWorld.prototype.emit = function (eventName, data) {
        if(eventListeners[eventName]) {
            eventListeners[eventName].forEach(function (listener) {
                setTimeout(function () {
                    listener(data);
                }, 0);
            });
        }
    };

    return GameWorld;
});