define(['pixi', '_'], function (PIXI, _) {
    'use strict';

    function WorldRenderer(worldInstance) {
        this.world = worldInstance;
        this.stage = new PIXI.stage(0xFFFFFF);
        this.renderer = PIXI.autoDetectRenderer(800, 800);
        this.avatars = [];
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
        this.avatars.push = { player: player, avatar: graphics }; //todo add some Avatar class
    };

    WorldRenderer.prototype.removePlayer = function (player) {
        //todo add remove Avatar logic
    };

    WorldRenderer.prototype.draw = function() {
        this.renderer.render(this.stage);
        requestAnimationFrame(this.draw.bind(this));
    };


    return WorldRenderer;
});