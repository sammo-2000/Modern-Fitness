import Joi from 'joi'

const validator = (schema) => (payload) =>
    schema.validate(payload);

const user_account_schema = Joi.object({
    username: Joi.string().alphanum().required(),
    password: Joi.string().min(5).max(20).required(),
});

const validate_user_account = validator(user_account_schema);

export default validate_user_account;
