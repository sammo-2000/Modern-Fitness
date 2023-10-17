import Joi from 'joi'

const validator = (schema) => (payload) =>
    schema.validate(payload);

const user_account_schema = Joi.object({
    first_name: Joi.string().min(2).max(30).required(),
    last_name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(20).required(),
});

const validate_user_account = validator(user_account_schema);

export default validate_user_account;
