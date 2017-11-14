const Rx = require('rxjs/Rx');

const logger = require('./logger').child({ component: 'main' });

const Messaging = require('./messaging');
const BuildService = require('./build-service');
const Compose = require('./compose');

Messaging.start()
    .then(() => Compose.bootstrap())
    .then(setupMessages)
    
function setupMessages({ buildService }) {
    Rx.Observable.fromEventPattern(newBuild)
        .pluck('buildRequest')
        .do(buildRequest => logger.info('Received a new build request', buildRequest))
        .subscribe(buildRequest => buildService.storeNewBuild(buildRequest));

    Rx.Observable.fromEventPattern(newBuild);
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