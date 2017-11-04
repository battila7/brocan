require('./config');

const logger = require('./logger').child({ component: 'main' });

const Collector = require('./collector');
const Publisher = require('./publisher');
const Orchestrator = require('./orchestrator');

const collectorPromise = Collector.setup()
    .then(function collectorStarted() {
        logger.info('Collector started.');
    });

const publisherPromise = Publisher.setup()
    .then(function publisherStarted() {
        logger.info('Publisher started.');
    });

Promise.all([ collectorPromise, publisherPromise ])
    .then(function readyToGo() {
        return Orchestrator.setup();
    })
    .catch(function setupFailed(err) {
        logger.error('Could not start Bond because of an error during the setup phase');
        logger.error(err);

        throw err;
    })
    .then(function start() {
        return Orchestrator.performBuild();
    })
