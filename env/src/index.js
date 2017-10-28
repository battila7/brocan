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
        return this.deps.config.get(property);
    },
    getOrDefault(property, value) {
        return this.has(property) ? this.get(property) : value;
    },
    getOrProvide(property, provider) {
        return this.has(property) ? this.get(property) : provider(property);
    },
    has(property) {
        return this.deps.config.has(property);
    }
};

Object.setPrototypeOf(env, null);

config.ensure = function ensure(properties) {
    
};

module.exports = env;
