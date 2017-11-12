const config = require('../config');

const Hemera = require('nats-hemera');
const nats = require('nats').connect({
    url: config.get('nats.uri')
});

const hemera = new Hemera(nats);

const Messaging = Object.create(hemera);

module.exports = Messaging;
