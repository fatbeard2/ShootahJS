define([], function () {
    'use strict';
    var eventListeners = {};
    function GameWorld() {
        this.players = {};

    }

    GameWorld.prototype.addPlayer = function (player) {
        this.emit('world.player.join');
        this.players[player.id] = player;
    };

    GameWorld.prototype.removePlayer = function (player) {
        this.emit('world.player.join');
        this.players[player.id] = null;
    };

    GameWorld.prototype.processDirectionInput = function (direction) {

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
        if(!eventListeners[eventName]) {
            eventListeners[eventName].forEach(function (listener) {
                setTimeout(function () {
                    listener.call(data);
                }, 0);
            });
        }
    };


    return GameWorld;
});