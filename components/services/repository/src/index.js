const logger = require('./logger').child({ component: 'main' });

const Messaging = require('./messaging');
const RepositoryService = require('./repository-service');
const Compose = require('./compose');

Messaging.start()
    .then(() => Compose.bootstrap())
    .then(setupMessages)
    
function setupMessages({ repositoryService }) {
    Messaging.add({
        topic: 'build.query',
        entity: 'repository',
        target: '*'
    }, function queryBuild(request, callback) {
        logger.info('Retrieving all repositories');

        logger.debug(request);

        repositoryService.getAllRepositories()
            .then(repositories => callback(null, { results: repositories }))
            .catch(err => callback(err));
    });
}
