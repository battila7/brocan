const config = require('../config');

const Hemera = require('nats-hemera');
const nats = require('nats').connect({
    url: config.get('nats.uri')
});

const hemera = new Hemera(nats);

const Messaging = {
    actAsync(pattern) {
        return new Promise(function callback(resolve, reject) {
            this.act(pattern, function done(err, resp) {
                if (err) {
                    reject(err)
                } else {
                    resolve(resp);
                }
            });
        }.bind(this));
    }
};

Object.setPrototypeOf(Messaging, hemera);

module.exports = Messaging;
