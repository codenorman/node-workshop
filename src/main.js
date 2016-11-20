'use strict';
var Hapi = require('hapi');
var Joi = require('joi');
var server = new Hapi.Server();

server.connection({port: 3000});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello World! from Hapi');
    }
});

server.register([{
    register: require('./games'),
    options: {}
    },
    require('vision'), require('inert'), { register: require('lout') }
], function(err){
    if(err){
        throw err;
    }
});

server.start(function (err) {
    if (err) {
        throw err;
    }
    console.log('Server running at ', server.info.port);
});
