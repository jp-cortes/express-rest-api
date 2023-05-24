const Joi = require('joi');

//validation for users

const id = Joi.string().uuid();
// const name = Joi.string().min(5).max(20);
// const lastname = Joi.string().min(5).max(20);
// const image = Joi.string();
// const country = Joi.string().min(3);
// const city = Joi.string().min(4).max(20);
// const address = Joi.string().min(4).max(20);
// const paymentMethods = Joi.object({
//   card: Joi.string().alphanum().min(16).max(16),
// });
const email = Joi.string()
const password = Joi.string()
const role = Joi.string().min(5)

const createUserSchema = Joi.object({
  // name: name.required(),
  // lastname: lastname.required(),
  // image: image.required(),
  // country: country.required(),
  // city: city.required(),
  // address: address.required(),
  // paymentMethods: paymentMethods.required(),
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = Joi.object({
  // name: name,
  // lastname: lastname,
  // image: image,
  // country: country,
  // city: city,
  // address: address,
  // paymentMethods: paymentMethods,
  email: email,
  role: role

});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
