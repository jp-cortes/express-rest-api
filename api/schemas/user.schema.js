const Joi = require('joi');

//validation for users

const id = Joi.number().integer();
const email = Joi.string().lowercase();
const password = Joi.string();
const role = Joi.string().lowercase();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.valid('customer')
});

const updateUserSchema = Joi.object({
  email: email,
  role: role.valid('admin', 'customer', 'seller')

});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
