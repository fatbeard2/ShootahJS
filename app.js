var config = {
    'socket-io-port': 1339,
    'static-server-port': 8081
};
require('./socket-io-server')(config);
require('./static-server')(config);