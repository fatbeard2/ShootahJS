if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['physicsjs'], function (Physics) {
    'use strict';

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

    Player.prototype.move = function (direction) {
        this.body.state.vel.x += direction.x;
        this.body.state.vel.y += direction.y;
    };

    Player.prototype.clientData = function () {
        return this.body.state;
    };


    return Player;
});