define(['lodash', 'models/Direction'], function (_, Direction) {
    'use strict';

    var directionCodes = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    var directionButtonsPressed = {
        left: false,
        up: false,
        right: false,
        down: false
    };

    function InputCollector() {
        this.directionUpdateHandlers = [];
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    InputCollector.prototype.onKeyDown = function (event) {
        var direction;
        if (directionCodes[event.keyCode]) {
            direction = directionCodes[event.keyCode];
            directionButtonsPressed[direction] = true;
            this.notifyDirectionUpdateHandler();
        }
    };

    InputCollector.prototype.onKeyUp = function (event) {
        var direction;
        if (directionCodes[event.keyCode]) {
            direction = directionCodes[event.keyCode];
            directionButtonsPressed[direction] = false;
            this.notifyDirectionUpdateHandler();
        }
    };

    InputCollector.prototype.onInputUpdate = function (callback) {
        this.directionUpdateHandlers.push(callback);
    };

    InputCollector.prototype.notifyDirectionUpdateHandler = function () {
        this.directionUpdateHandlers.forEach(function (handler) {
            handler(this.getCurrentDirection());
        }, this);
    };

    InputCollector.prototype.getCurrentDirection = function () {
        var dx, dy;
        if (directionButtonsPressed['left'] === true && directionButtonsPressed['right'] === false) {
            dx = -1;
        } else if (directionButtonsPressed['left'] === false && directionButtonsPressed['right'] === true) {
            dx = 1;
        } else{
            dx = 0;
        }
        if (directionButtonsPressed['down'] === true && directionButtonsPressed['up'] === false) {
            dy = -1;
        } else if (directionButtonsPressed['down'] === false && directionButtonsPressed['up'] === true) {
            dy = 1;
        } else{
            dy = 0;
        }

        return new Direction(dx, dy);
    };


    return InputCollector;
});