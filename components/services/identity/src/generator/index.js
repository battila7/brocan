const { createHash } = require('crypto');

const Generator = {
    deps: {
        createHash
    },

    generateFrom(buildRequest) {
        const hash = this.deps.createHash('sha256');

        [ '' + buildRequest.timestamp,
          buildRequest.repository.uri,
          buildRequest.commit.hash ]
          .forEach(part => hash.update(part));

        return hash.digest().toString('hex');
    }
};

module.exports = Generator;
