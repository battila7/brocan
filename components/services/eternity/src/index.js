const Rx = require('rxjs/Rx');

const logger = require('./logger').child({ component: 'main' });

const Messaging = require('./messaging');
const BuildService = require('./build-service');

Messaging.ready(function messagingReady() {
    const messageSource = Rx.Observable.bindCallback(Messaging.add.bind(Messaging));

    observableFromMessages({
        topic: 'build.info',
        role: 'new',

        pubsub$: true
    }).pluck('buildRequest')
      .each(buildRequest => logger.info('Received a new build request', buildRequest))
      .subscribe(buildRequest => BuildService.storeNewBuild(buildRequest));

    observableFromMessages({
        topic: 'build.info',
        role: 'progress',

        pubsub$: true
    });
});
