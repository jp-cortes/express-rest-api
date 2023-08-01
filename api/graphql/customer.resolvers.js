const CustomerService = require('../services/customers.services');
const service = new CustomerService();


const  addCustomer = async(_, { dto }) => {
  const newCustomer = await service.create(dto);
  return newCustomer;
}

const  updateCustomer = async(_, { id, dto }) => {
  const customer = await service.update(id, dto);
  return customer;
}

const  deleteCustomer = async(_, { id }) => {
    await service.delete(id);
  return id;
}

module.exports = {  addCustomer, updateCustomer, deleteCustomer }
