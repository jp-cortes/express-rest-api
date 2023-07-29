const Joi = require('joi');

const id = Joi.number().integer();
const paid = Joi.boolean();
const status = Joi.string();

//relation  N:N order-product
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const createOrderSchema = Joi.object({
  paid: paid.required(),
  status: status.required(),
});

const updateOrderSchema = Joi.object({
  id: id,
  paid: paid,
  status: status.required()
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema }
