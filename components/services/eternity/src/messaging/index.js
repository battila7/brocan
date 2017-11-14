const config = require('../config');

const Hemera = require('nats-hemera');
const nats = require('nats').connect({
    url: config.get('nats.uri')
});

const hemera = new Hemera(nats);

const Messaging = {
    start() {
        return new Promise((resolve, reject) => {
            this.ready(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }
};

Object.setPrototypeOf(Messaging, hemera);

module.exports = Messaging;
