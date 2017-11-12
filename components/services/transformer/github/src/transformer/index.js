const Identifier = require('../identifier');

const Transformer = {
    async transform(payload) {
        const result = {
            commitCount: payload.size,
            timestamp: Date.now(),
            author: {
                name: payload.pusher.name,
                username: payload.sender.login,
                uri: payload.sender.html_uri
            },
            branch: {
                name: this.branchName(payload),
                uri: this.branchUri(payload)
            },
            commit: {
                hash: payload.head_commit.id,
                message: payload.head_commit.message,
                uri: payload.head_commit.url
            },
            repository: {
                name: payload.repository.name,
                uri: payload.repository.url
            }
        };

        const buildId = await Identifier.request(result);

        result.buildId = buildId;
            
        return result;
    },
    branchName(payload) {
        return payload.ref.split('/')[2];
    },
    branchUri(payload) {
        const branch = this.branchName(payload);

        return `${payload.repository.html_uri}/tree/${branch}`;
    }
};

module.exports = Transformer;