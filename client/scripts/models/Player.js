define([], function () {
    'use strict';

    function Player(id, spec) {
        spec = spec || {};
        this.id = id;
        this.x = spec.x || 0;
        this.y = spec.y || 0;
        this.velocity = spec.velocity || 0;
    }

    Player.prototype.move = function (direction) {
        this.x += direction.x;
        this.y += direction.y;
    };


    return Player;
});