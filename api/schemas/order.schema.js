const Joi = require('joi');

const id = Joi.number().integer();
const paid = Joi.boolean();
const status = Joi.string()

const createOrderSchema = Joi.object({
  customerId: id.required(),
  paid: paid.required(),
  status: status.required()
});

const updateOrderSchema = Joi.object({
  id: id,
  paid: paid.required(),
  status: status.required()
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema }
