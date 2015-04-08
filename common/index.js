requirejs = require('requirejs');
requirejs.config({
    nodeRequire: require,
    baseUrl: __dirname,
    paths: {
        'physicsjs': 'libs/physicsjs/dist/physicsjs-full'
    }
});

module.exports = {
    Player: requirejs('./Player'),
    World: requirejs('./World')
};