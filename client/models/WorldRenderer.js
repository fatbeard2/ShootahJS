define(['pixi', 'physicsjs'], function (PIXI, Physics) {
    'use strict';

    function WorldRenderer(worldInstance) {
        window.PIXI = PIXI;
        this.world = worldInstance;
        this.renderer = Physics.renderer('pixi', {
            el: 'viewport',
            width: worldInstance.width,
            height: worldInstance.height
        });
        worldInstance.simulation.add(this.renderer);
        worldInstance.simulation.on('step', function () {
            worldInstance.simulation.render();
        });
    }

    return WorldRenderer;
});