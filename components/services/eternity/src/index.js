const Rx = require('rxjs/Rx');

const logger = require('./logger').child({ component: 'main' });

const Messaging = require('./messaging');
const BuildService = require('./build-service');
const Compose = require('./compose');

const FAILED_STATUS = 'failed';

Messaging.start()
    .then(() => Compose.bootstrap())
    .then(setupMessages)
    
function setupMessages({ buildService }) {
    Rx.Observable.fromEventPattern(newBuild)
        .pluck('buildRequest')
        .do(buildRequest => logger.info('Received a new build request', buildRequest))
        .subscribe(buildRequest => {
            buildService.storeNewBuild(buildRequest)
                .catch(err => logger.warn(err));
        });

    Rx.Observable.fromEventPattern(buildProgress)
        .do(request => logger.info('Received build progress update', request))
        .subscribe(update => buildService.addFailedUpdate(update));

    Messaging.add({
        topic: 'build.queryBuild'
    }, function queryBuild(request, callback) {
        logger.info('Retrieving build data for id', request.id);

        buildService.getBuildById(request.id)
            .then(build => callback(null, build))
            .catch(err => callback(err));
    });
}

function newBuild(handler) {
    Messaging.add({
        topic: 'build.info',
        role: 'new',

        pubsub$: true
    }, handler);
}

function buildProgress(handler) {
    Messaging.add({
        topic: 'build.info',
        role: 'progress',

        pubsub$: true
    }, handler);
}
