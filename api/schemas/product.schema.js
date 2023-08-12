const Joi = require('joi');

//valiadation for products

const id = Joi.number().integer();
const name = Joi.string().lowercase().min(5);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const description = Joi.string().lowercase().min(10);
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();


const min_price = Joi.number().integer();
const max_price = Joi.number().integer();


const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  id: id,
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit: limit,
  offset: offset,
  price: price,
  min_price: min_price,
  max_price: max_price.when('min_price', {
    is: min_price.required(),
    then: Joi.required(),
  })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };
