const Joi = require('joi');

//validation for auth
const email = Joi.string().lowercase();
const password = Joi.string();
const newPassword = Joi.string();
const token = Joi.string().min(5);

const loginAuthSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const recoveryAuthSchema = Joi.object({
  email: email.required()
});

const changePasswordSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
});

module.exports = { loginAuthSchema, recoveryAuthSchema, changePasswordSchema };
