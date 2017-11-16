const config = require('./config');

const logger = require('./logger').child({ component: 'main' });

const Hemera = require('nats-hemera');
const nats = require('nats').connect({
    url: config.get('nats.uri')
});

const Search = require('./search');

const search = Object.create(Search);
search.Search(config.get('elasticsearch.uri'), config.get('elasticsearch.index'));

const hemera = new Hemera(nats);

hemera.ready(function hemeraReady() {
    hemera.add({
        topic: 'build.getLogsForBuild',
    }, async function get(request) {
        logger.info('Getting logs for build "%s" from "%d" to "%d"', request.id, request.from, request.to);

        logger.debug(request);

        const results = await search.query(request.id, request.from, request.to);

        return { results };
    });
});
