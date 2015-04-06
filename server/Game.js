define(['common/Player', 'common/World'], function (Player, World) {
    var players = {};
    var playersCount = 0;

    function Game(options) {}

    Game.prototype.init = function (io) {
        this.io = io;

        setInterval((function () {
            io.emit('world.frame', this.getFrame());
        }).bind(this), 100);

        io.on('connect', (function (socket) {
            this.addPlayer(socket);
        }).bind(this));
    };

    Game.prototype.addPlayer = function (socket) {
        var newPlayer = new Player(socket);
        this.setEventListeners(socket);
        this.io.emit('world.player.join', newPlayer.clientData() );
        socket.emit('world.player.init', newPlayer.clientData() );
        players[socket.id] = newPlayer;
        console.warn('connected ' + socket.id + '. Total players: ' + ++playersCount);
    };


    Game.prototype.removePlayer = function (socket) {
        this.io.emit('world.player.leave', {id: socket.id} );
        players[socket.id] = undefined;
        console.warn('disconnected ' + socket.id + '. Total players: ' + --playersCount);
    };

    Game.prototype.setEventListeners = function (socket) {
        var self = this;
        socket.on('disconnect', function () {
            self.removePlayer(socket);
        });

        socket.on('world.player.move', function (data) {
            players[socket.id].increaseX(data.x);
            players[socket.id].increaseY(data.y);
        });
    };

    Game.prototype.getFrame = function () {
        var frame = {
            players: []
        };
        for (var id in players) {
            if(players[id]) frame.players.push(players[id].clientData());
        }
        //console.dir(frame);
        return frame;
    };

    return Game;
});
