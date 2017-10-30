const Docker = require('dockerode');

const logger = require('../../logger').child({ component: 'runBuild' });

const runBuildStep = {
    deps: {
        Docker
    },

    async run(base) {
        return new Promise(async () => {
        const docker = new Docker();

        const container = await docker.createContainer({
            Image: base,
            Tty: true,
            Cmd: ['/bin/bash'],
            Env: ['BOLT_RUNNER_BROCANFILE_PATH=brocan.hjson', 'BOLT_RUNNER_BUILD_ID=abc', 'BOLT_RUNNER_REPORTER_HOST=localhost:3000'],
            Volumes: {
                '/stuff': {}
            },
            HostConfig: {
                Binds: ['/home/attila/brocan/bond/tmp:/stuff']
            }
        });

        await container.start();

        var options = {
            Cmd: ['bash', '-c', 'node -v && npm i @brocan/bolt -g && cd /stuff && ls -la && bolt'],
            AttachStdout: true,
            AttachStderr: true
        };
        
        container.exec(options, function(err, exec) {
            if (err) return;
            exec.start(function(err, stream) {
                if (err) return;
    
                container.modem.demuxStream(stream, process.stdout, process.stderr);
    
                exec.inspect(function(err, data) {
                    if (err) return;
                    console.log(data);
                });
            });
        });
    });
    }
};

module.exports = runBuildStep;
