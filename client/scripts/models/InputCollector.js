define(['lodash'], function (_) {
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

    function InputCollector(socket) {
        this.socket = socket;
        this.directionCodes = directionCodes;
        this.directionButtonsPressed = directionButtonsPressed;
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    InputCollector.prototype.onKeyDown = function (event) {
        if (directionCodes[event.keyCode]) {

        }
    };

    InputCollector.prototype.sendUserInput = function () {
        this.socket.emit()
    };

    return InputCollector;
});