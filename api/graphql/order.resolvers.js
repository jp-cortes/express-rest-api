const OrderService = require('../services/orders.services');
const service = new OrderService();

const  addOrder = async(_, { dto }) => {
  const newCustomer = await service.create(dto);
  return newCustomer;
}

module.exports = { addOrder };
