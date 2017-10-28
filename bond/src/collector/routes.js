const orchestrator = require('../orchestrator/orchestrator');
const publisher = require('../publisher/publisher');

const buildIdHandler = function buildIdHandler(req, resp, done) {
    if (!orchestrator.validateBuildId(req.params.buildId)) {
        resp.send({});
    }

    done();
};

const publishWithScope = function publishWithScope(scope, info) {
    const extendedInfo = Object.assign({}, info, {
        scope
    });

    publisher.publish(extendedInfo);
};

const reportBuild = {
    method: 'POST',
    url: '/:buildId/report/build',
    beforeHandler: buildIdHandler,

    handler(req, resp) {
        resp.send({});

        publishWithScope('build', req.body);

        orchestrator.updateBuildStatus(req.body.status);
    }
};

const reportStep = {
    method: 'POST',
    url: '/:buildId/report/step',
    beforeHandler: buildIdHandler,

    handler(req, resp) {
        resp.send({});

        publishWithScope('step', req.body);
    }
};

const reportCommand = {
    method: 'POST',
    url: '/:buildId/report/command',
    beforeHandler: buildIdHandler,

    handler(req, resp) {
        resp.send();

        publishWithScope('command', req.body);
    }
};

module.exports = function register(fastify, options, next) {
    fastify.route(reportBuild);
    fastify.route(reportStep);
    fastify.route(reportCommand);

    next();
};
