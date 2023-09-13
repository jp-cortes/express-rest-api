const { checkJwtGql } = require('../utils/checkJwtGql');
const { checkRolesGql } = require('../utils/checkRolesGql');


const CustomerService = require('../services/customers.services');
const service = new CustomerService();

const getCustomers = async(_, _dto, context) => {
  const user = await checkJwtGql(context);
  checkRolesGql(user, 'admin');
  const customers = await service.find({});
  return customers;
}

const getCustomer = async(_, { id }, context) => {
  await checkJwtGql(context);
  const customer = await service.findById(id);
  return customer;
}


const  addCustomer = async(_, { dto }) => {
  const newCustomer = await service.create(dto);
  return newCustomer;
}

const  updateCustomer = async(_, { id, dto }, context) => {
  await checkJwtGql(context);
  const customer = await service.update(id, dto);
  return customer;
}

const  deleteCustomer = async(_, { id }) => {
    await service.delete(id);
  return id;
}

module.exports = { getCustomers, getCustomer, addCustomer, updateCustomer, deleteCustomer }
