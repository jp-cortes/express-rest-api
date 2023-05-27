const Joi = require('joi');
const { createUserSchema, updateUserSchema } = require('./user.schema')
//validation for customers

const id = Joi.number().integer();
const name = Joi.string().min(3).max(20);
const lastname = Joi.string().min(3).max(20);
const phone = Joi.number().integer();
const userId = Joi.number().integer();
// const image = Joi.string();
// const country = Joi.string().min(3);
// const city = Joi.string().min(4).max(20);
// const address = Joi.string().min(4).max(20);
// const paymentMethods = Joi.object({
//   card: Joi.string().alphanum().min(16).max(16),
// });

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastname.required(),
  phone: phone.required(),
  user: createUserSchema

  // image: image.required(),
  // country: country.required(),
  // city: city.required(),
  // address: address.required(),
  // paymentMethods: paymentMethods.required(),

});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastname,
  phone: phone,
  user: updateUserSchema,
  userId: userId,
  // image: image,
  // country: country,
  // city: city,
  // address: address,
  // paymentMethods: paymentMethods,
  // email: email,


});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
