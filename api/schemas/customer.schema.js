const Joi = require('joi');

//validation for customers

const id = Joi.number().integer();
const name = Joi.string().min(5).max(20);
const lastname = Joi.string().min(5).max(20);
const phone = Joi.number().integer();
const userId = Joi.number().integer();
const email = Joi.string()
const password = Joi.string()
// const image = Joi.string();
// const country = Joi.string().min(3);
// const city = Joi.string().min(4).max(20);
// const address = Joi.string().min(4).max(20);
// const paymentMethods = Joi.object({
//   card: Joi.string().alphanum().min(16).max(16),
// });

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastname: lastname.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
  // image: image.required(),
  // country: country.required(),
  // city: city.required(),
  // address: address.required(),
  // paymentMethods: paymentMethods.required(),

});

const updateCustomerSchema = Joi.object({
  name,
  lastname,
  phone,
  userId,
  // name: name,
  // lastname: lastname,
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
