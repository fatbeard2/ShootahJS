define([], function () {
    'use strict';
    var eventListeners = {};
    function GameWorld() {
        this.players = {};
    }

    GameWorld.prototype.addPlayer = function (player) {
        this.emit('world.player.join', player);
        this.players[player.id] = player;
    };

    GameWorld.prototype.removePlayerById = function (playerId) {
        this.emit('world.player.leave', playerId);
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