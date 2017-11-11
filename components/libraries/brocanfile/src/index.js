const parser = require('./parser');
const validator = require('./validator');

const brocanfile = {
    deps: {
        parser, validator
    },

    async read(filename) {
        let contents;

        try {
            contents = await parser.parseFile(filename);
        } catch (err) {
            throw err;
        }

        const errors = validator.validate(contents);

        if (errors.length > 0) {
            const err = new Error('Malformed brocanfile!');

            err.validationErrors = errors;

            throw err;
        }

        return contents;
    }
};

module.exports = brocanfile;
