const config = require('../config');

const Storage = require('../storage');
const Hemera = require('nats-hemera');
const nats = require('nats').connect({
    url: config.get('nats.uri')
});

const hemera = new Hemera(nats);

hemera.add({
    topic: 'build.queryBuildData'
}, async function queryHandler(req) {
    console.log(req);

    return await Storage.get(req.buildId);
});
