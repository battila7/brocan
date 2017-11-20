const Rx = require('rxjs/Rx');

const logger = require('./logger').child({ component: 'main' });

const Messaging = require('./messaging');
const BuildService = require('./build-service');
const Compose = require('./compose');

Messaging.start()
    .then(() => Compose.bootstrap())
    .then(setupMessages)
    
function setupMessages({ buildService }) {
    Messaging.add({
        topic: 'build.query',
        entity: 'build',
        target: '*'
    }, function queryBuild(request, callback) {
        logger.info('Retrieving all builds');

        logger.debug(request);

        buildService.getAllBuilds()
            .then(builds => callback(null, { results: builds }))
            .catch(err => callback(err));
    });

    Messaging.add({
        topic: 'build.query',
        entity: 'build',
        target: /[^*].*/
    }, function queryBuild(request, callback) {
        logger.info('Retrieving data for build "%s"', request.target);

        logger.debug(request);

        buildService.getBuild(request.target)
            .then(build => callback(null, build))
            .catch(err => callback(err));
    });
}
