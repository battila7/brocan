const elasticsearch = require('elasticsearch');

const logger = require('../logger').child({ component: 'search' });

const Search = {
    deps: {
        elasticsearch
    },

    Search(uri, index) {
        this.index = index;
        this.client = new this.deps.elasticsearch.Client({
            host: uri,
            log: 'info'
        });
    },
    query(id, from, to) {
        const setTo = to || Date.now();

        return this.client.search({
            index: this.index,
            type: 'log',
            size: 25,
            body: {
                query: {
                    bool: {
                        must: [
                            {
                                match: {
                                    buildId: id
                                },
                            },
                            {
                                match: {
                                    commandOutput: true
                                }
                            },
                            {
                                range: {
                                    time: {
                                        gte: from,
                                        lte: setTo
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        }).then(response => this.transformResponse(response));
    },
    transformResponse(response) {
        return response.hits.hits.map(hit => {
            const source = hit['_source'];

            return {
                time: source.time,
                message: source.msg,
                step: source.step,
                command: source.command,
                index: source.commandIndex
            }
        });
    }
}

module.exports = Search;
