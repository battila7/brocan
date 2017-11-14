const Initiator = {
    Initiator(headers, payload, messaging) {
        this.webhookRequest = {
            headers,
            payload
        };
        this.messaging = messaging;
    },
    async initiateBuild(isDryRun = false) {
        const buildRequest = await this.transformWebhookRequest();

        const id = await this.requestBuildId(buildRequest);

        buildRequest.id = id;

        if (!isDryRun) {
            await this.announceBuild(this.webhookRequest, buildRequest);
        }

        return buildRequest;
    },
    transformWebhookRequest() {
        return new Promise((resolve, reject) => {
            this.messaging.act({
                topic: 'build.transform',
                webhookRequest: this.webhookRequest
            }, (err, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    },
    requestBuildId(buildRequest) {
        return new Promise((resolve, reject) => {
            this.messaging.act({
                topic: 'build.generateIdentifier',
                buildRequest
            }, (err, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response.id);
                }
            });
        });
    },
    announceBuild(webhookRequest, buildRequest) {
        return new Promise((resolve, reject) => {
            this.messaging.act({
                topic: 'build.info',
                role: 'new',
                buildRequest,
                webhookRequest,

                pubsub$: true
            }, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
};

module.exports = Initiator;
