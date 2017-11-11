const config = require('config');

const env = {
    deps: {
        config
    },

    ensure(properties) {
        const missing = properties.filter(property => !this.has(property));

        if (missing.length > 0) {
            const err = new Error(`Missing configuration properties: ${missing}`);

            err.missing = missing;

            throw err;
        }

        return this;
    },
    get(property) {
        return this.hasEnv(property) ? this.getEnv(property) : this.deps.config.get(property);
    },
    getAll(...properties) {
        return properties.map(property => this.get(property));
    },
    getOrDefault(property, value) {
        return this.has(property) ? this.get(property) : value;
    },
    getOrProvide(property, provider) {
        return this.has(property) ? this.get(property) : provider(property);
    },
    has(property) {
        return this.hasEnv(property) || this.deps.config.has(property);
    },
    hasEnv(property) {
        return Object.prototype.hasOwnProperty.call(process.env, property);
    },
    getEnv(property) {
        return process.env[property];
    }
};

Object.setPrototypeOf(env, null);

module.exports = env;
