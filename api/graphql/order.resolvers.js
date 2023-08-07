const { checkJwtGql } = require('../utils/checkJwtGql');
const { checkRolesGql } = require('../utils/checkRolesGql');


const OrderService = require('../services/orders.services');
const service = new OrderService();

const getOrders = async(_, context) => {
  const user = await checkJwtGql(context);
  checkRolesGql(user, 'admin');
  const orders = await service.find({});
  return orders;
}

const  addOrder = async(_, { dto }, context) => {
  await checkJwtGql(context);
  const newCustomer = await service.create(dto);
  return newCustomer;
}

const  addProductToOrder = async(_, { dto }, context) => {
  await checkJwtGql(context);
  const item = await service.addItem(dto);
  return item;
}

module.exports = { getOrders, addOrder, addProductToOrder };
