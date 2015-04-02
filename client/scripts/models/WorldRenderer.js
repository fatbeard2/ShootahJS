define(['pixi'], function (PIXI) {
    'use strict';

    function WorldRenderer(worldInstance) {
        this.world = worldInstance;
        this.avatars = {};
        this.stage = new PIXI.Stage;
        this.renderer = PIXI.autoDetectRenderer(800, 800);
        this.world.on('world.player.join', this.addPlayer.bind(this));
        this.world.on('world.player.leave', this.removePlayer.bind(this));
        document.body.appendChild(this.renderer.view);
        this.draw();
    }

    WorldRenderer.prototype.addPlayer = function (player) {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFF00);
        graphics.lineStyle(5, 0xFF0000);
        graphics.drawCircle(player.x, player.y, 10);
        this.stage.addChild(graphics);
        this.avatars[player.id] = { player: player, body: graphics };
    };

    WorldRenderer.prototype.removePlayer = function (player) {
        //todo add remove Avatar logic
    };

    WorldRenderer.prototype.draw = function() {
        for (var id in this.avatars) {
            var current = this.avatars[id];
            current.body.x = current.player.x;
            current.body.y = current.player.y;
        }
        this.renderer.render(this.stage);
        requestAnimationFrame(this.draw.bind(this));
    };


    return WorldRenderer;
});