'use strict';
var Hapi = require('hapi');
var _ = require('lodash');
var Joi = require('joi');
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

server.route({
    method: 'GET',
    path: '/games',
    handler: function (request, reply) {
        reply(games);
    }
});

server.route({
    method: 'GET',
    path: '/games/{id}',
    handler: function (request, reply) {
        // var game = _.find(games, {'id': parseInt(request.params.id, 10)});
        var game = _.find(games, {'id': request.params.id});
        reply(game);
    },
    config: {
        validate: {
            params: {
                id: Joi.number().integer().min(1).required()
            }
        }
    }
});

server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log('Server running at ', server.info.port);
});
