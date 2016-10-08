'use strict';
var Hapi = require('hapi');

var server = new Hapi.Server();
var games = require('./games.json');
console.log(games);

server.connection({port: 3000});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello World! from Hapi');
    }
});

server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log('Server running at ', server.info.port);
});
