const { checkJwtGql } = require('../utils/checkJwtGql');
const { checkRolesGql } = require('../utils/checkRolesGql');


const OrderService = require('../services/orders.services');
const service = new OrderService();

const getOrders = async(_, _dto, context) => {
  const user = await checkJwtGql(context);
  checkRolesGql(user, 'admin');
  const orders = await service.find({});
  return orders;
}

const getOrdersByUser = async(_, __, context) => {
  const user = await checkJwtGql(context);
  const id = { userId:user.sub };
  const orders = await service.findByUserId(id);
  return orders;
}
const  addOrder = async(_, { dto }, context) => {
  const user = await checkJwtGql(context);
  const body = { userId:user.sub, ...dto };
  const newOrder = await service.create(body);
  return newOrder;
}

const  addProductToOrder = async(_, { dto }, context) => {
  await checkJwtGql(context);
  const item = await service.addItem(dto);
  return item;
}

module.exports = { getOrders, getOrdersByUser, addOrder, addProductToOrder };
