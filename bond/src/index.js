const env = require('@brocan/env').ensure([
    'reportCollector.port'
]);

const collectorServer = require('./collector/server');

collectorServer.listen()
    .then(function collectorStarted() {
        console.log('Collector started!');
    });
