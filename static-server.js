var serveStatic = require('serve-static');

module.exports = function (config) {
    var connect = require('connect'),
        serveClientDirectory = serveStatic('./client'),
        serveCommonDirectory = serveStatic('./common');

    connect()
        .use(serveClientDirectory)
        .use('/common', serveCommonDirectory)
        .listen(config['static-server-port']);

    console.log('Static server up and running on port ' + config['static-server-port']);
};
