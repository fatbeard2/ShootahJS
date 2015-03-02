define(['pixi'], function (PIXI) {
    'use strict';

    function Stage() {
        this.stage = new PIXI.Stage(0xFFFFFF);
        this.renderer = PIXI.autoDetectRenderer(800, 800);
        this.players = {};
        document.body.appendChild(this.renderer.view);
        this.draw();
    }

    Stage.prototype.draw = function() {
        this.renderer.render(this.stage);
        requestAnimationFrame(this.draw.bind(this));
    };

    Stage.prototype.addPlayer = function (player) {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFF00);
        graphics.lineStyle(5, 0xFF0000);
        graphics.drawCircle(player.x, player.x, 10);
        this.stage.addChild(graphics);
        this.players[player.id] = {id: player.id, avatar: graphics};
    };

    Stage.prototype.update = function (frame) {
        frame.players.forEach(function (player) {
            this.players[player.id].avatar.position.x = player.x;
            this.players[player.id].avatar.position.y = player.y;
        }, this);
    };

    return Stage;
});