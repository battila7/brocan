const orchestrator = require('../orchestrator/orchestrator');
const publisher = require('../publisher/publisher');

const buildIdHandler = function buildIdHandler(req, resp, done) {
    if (!orchestrator.validateBuildId(req.params.buildId)) {
        resp.send({});
    }

    done();
};

const reportBuild = {
    method: 'POST',
    url: '/:buildId/report/build',
    beforeHandler: buildIdHandler,
    async handler(req, resp) {
        
    }
};

const reportStep = {
    method: 'POST',
    url: '/:buildId/report/step',
    beforeHandler: buildIdHandler,
    async handler(req, resp) {
        
    }
};

const reportCommand = {
    method: 'POST',
    url: '/:buildId/report/command',
    beforeHandler: buildIdHandler,
    async handler(req, resp) {
        
    }
};

module.exports = function register(fastify, options, next) {
    fastify.route(reportBuild);
    fastify.route(reportStep);
    fastify.route(reportCommand);

    next();
};
