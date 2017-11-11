const config = require('./config');

const Hemera = require('nats-hemera');
const nats = require('nats').connect({
    url: config.get('nats.uri')
});

const hemera = new Hemera(nats);

const inputPromise = new Promise((resolve, reject) => {
    let input = '';

    process.stdin.on('data', data => {
        input += data;
    });

    process.stdin.on('error', err => {
        reject(err);
    })

    process.stdin.on('end', () => {
        resolve(input);
    });
});

const hemeraPromise = new Promise((resolve, reject) => {
    hemera.ready(err => {
        if (err) {
            reject(err);
        } else {
            resolve(hemera);
        }
    });
});

Promise.all([inputPromise, hemeraPromise])
    .then(([ input, hemera ]) => {
        const pattern = JSON.parse(input);

        return new Promise((resolve, reject) => {
            hemera.act(pattern, (response, err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    })
    .then(() => {
        hemera.close();
    });
