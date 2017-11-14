const Rx = require('rxjs/Rx');

const logger = require('./logger').child({ component: 'main' });

const Messaging = require('./messaging');
const BuildService = require('./build-service');
const Compose = require('./compose');

Messaging.start()
    .then(() => Compose.bootstrap())
    .then(setupMessages)
    
function setupMessages({ buildService }) {
    const observableFromMessages = Rx.Observable.bindCallback(Messaging.add.bind(Messaging));

    observableFromMessages({
        topic: 'build.info',
        role: 'new',

        pubsub$: true
    }).pluck('buildRequest')
      .each(buildRequest => logger.info('Received a new build request', buildRequest))
      .subscribe(buildRequest => buildService.storeNewBuild(buildRequest));

    observableFromMessages({
        topic: 'build.info',
        role: 'progress',

        pubsub$: true
    });
}
