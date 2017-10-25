const Joi = require('joi');

const alphanumUnderscoreDash = /^[a-zA-Z0-9_\-]{3,100}$/;

const schema = Joi.object().keys({
    base: Joi.string().regex(alphanumUnderscoreDash).required(),
    owner: Joi.string().regex(alphanumUnderscoreDash).required(),
    steps: Joi.array().items(
        Joi.object().keys({
            name: Joi.string().regex(alphanumUnderscoreDash).required(),
            commands: Joi.array().items(Joi.string()).required()
        })
    ).unique('name').required()
});

/*
 * The validator object has no explicit dependencies because testing it without Joi would be extremely
 * cumbersome and most probably unnecessary. Therefore Joi cannot be mocked.
 */
const validator = {
    validate(contents) {
        const validationResult = Joi.validate(contents, schema, { abortEarly: false });

        if (validationResult.error) {
            return validationResult.error.details.map(detail => detail.message);
        } else {
            return [];
        }
    },
    validateFlow(contents) {
        const result = {
            
        };

        if (!contents.flow) {

        }
    }
};

Object.setPrototypeOf(validator, null);

module.exports = validator;
