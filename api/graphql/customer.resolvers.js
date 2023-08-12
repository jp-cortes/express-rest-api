const CustomerService = require('../services/customers.services');
const service = new CustomerService();

const getCustomers = async() => {
  const customers = await service.find({});
  return customers;
}

const getCustomer = async(_, { id }) => {
  const customer = await service.findById(id);
  return customer;
}


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

module.exports = { getCustomers, getCustomer, addCustomer, updateCustomer, deleteCustomer }
