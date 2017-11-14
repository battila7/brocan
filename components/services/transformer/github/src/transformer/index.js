const Transformer = {
    transform(payload) {
        return {
            commitCount: payload.size,
            timestamp: Date.now(),
            author: {
                name: payload.pusher.name,
                username: payload.sender.login,
                uri: payload.sender.html_url
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
                uri: payload.repository.html_url
            }
        };
    },
    branchName(payload) {
        return payload.ref.split('/')[2];
    },
    branchUri(payload) {
        const branch = this.branchName(payload);

        return `${payload.repository.html_url}/tree/${branch}`;
    }
};

module.exports = Transformer;