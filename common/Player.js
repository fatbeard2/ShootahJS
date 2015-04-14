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

    Player.prototype.move = function (vector) {
        this.body.state.vel.x += vector.x * 0.1;
        this.body.state.vel.y += vector.y * 0.1;
        console.warn('vx is ' + this.body.state.pos.x);
        console.warn('vy is ' + this.body.state.pos.y);
    };

    Player.prototype.serialize = function () {
        var player = this;
        return {
            state: player.body.state,
            id: player.id
        }
    };


    return Player;
});