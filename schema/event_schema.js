import Joi from 'joi';

const validator = (schema) => (payload) =>
    schema.validate(payload);

const schema = Joi.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);

const event_schema = Joi.object({
    title: Joi.string().regex(/^[a-zA-Z0-9 ]{3,30}$/).required(),
    time: schema.required(),
    date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required(),
    space_available: Joi.number().max(50).required(),
});

const validate_event = validator(event_schema);

export default validate_event;
