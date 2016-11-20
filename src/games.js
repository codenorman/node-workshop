'use strict';
var _ = require('lodash');
var Joi = require('joi');
var Boom = require('boom');
var games = require('./games.json');

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/games',
        handler: function (request, reply) {
            return reply(games);
        }
    });

    server.route({
        method: 'GET',
        path: '/games/{id}',
        handler: function (request, reply) {
            var game = _.find(games, {'id': request.params.id});
            if (!game) {
                return reply(Boom.notFound('game id not found'));
            }
            return reply(game);
        },
        config: {
            validate: {
                params: {
                    id: Joi.number().integer().min(1).required()
                }
            }
        }
    });

    server.route({
        method: "POST",
        path: '/games',
        handler: function (request, reply) {
            var index = _.maxBy(games, 'id').id + 1;    // Get the max index and add 1
            var name = request.payload.name;
            var game = {id: index, name: name};         // Create a new game object
            games.push(game);               // push game on the games array
            return reply(game);                               // reply with the added game object
        },
        config: {
            validate: {
                payload: {
                    name: Joi.string().required()
                }
            }
        }
    });

    server.route({
        method: "PUT",
        path: '/games/{id}',
        handler: function (request, reply) {
            var index = _.indexOf(games, _.find(games, {'id': request.params.id})); // find by id and get array index
            var name = request.payload.name;
            var game = {id: request.params.id, name: name}  // create new game object
            games[index] = game;                            // Update (replace) existing game object
            return reply(game);                                   // reply with the updated game
        },
        config: {
            validate: {
                params: {
                    id: Joi.number().integer().min(1).required()
                },
                payload: {
                    name: Joi.string().required()
                }
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'games',
    version: '1.0.0'
};

