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
    ).unique('name').required(),
    flow: Joi.array().items(
        Joi.object().items({
            step: Joi.string().regex(alphanumUnderscoreDash).required(),
            when: Joi.object().pattern(/\-?[0-9]+/, Joi.string().regex(alphanumUnderscoreDash))
        })
    )
});

/*
 * The validator object has no explicit dependencies because testing it without Joi would be extremely
 * cumbersome and most probably unnecessary. Therefore Joi cannot be mocked.
 */
const validator = {
    validate(contents) {
        const result = Joi.validate(contents, schema, { abortEarly: false });

        
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
