const client = require('faktory-client').create();

const [  ]

const queue = {
    deps: {
        client
    },

    setup() {
        return client.connect();
    },
    next() {
        return
    }
}
