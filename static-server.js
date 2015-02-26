var serveStatic = require('serve-static');
var http = require('http');
var errHandler = function() {
    return function (req, res, next) {
    }
};

module.exports = function (config) {
    var serve = serveStatic('./client', {'index': ['index.html']});
    var server = http.createServer(function(req, res){
        serve(req, res, errHandler);
    });
    console.warn('Static server up and running on port ' + config['static-server-port']);
    server.listen(config['static-server-port']);
};
