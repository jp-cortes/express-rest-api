require('dotenv').config({path: './.env'});// first read the  .env variables
const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class CustomersService {
  constructor() { }
// find all customers

  async find() {
    const response = await models.Customer.findAll({
      include: ['user'],
      // exclude:['password']
    });

    // delete response.dataValues.recoveryToken;
    return response;
  }
//create customer
  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return newCustomer;
  }
// find customer by id
  async findById(id) {
    const customer = models.Customer.findByPk(id);
    if(!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }
//update customer
  async update(id, changes) {
    const customer = await this.findById(id);
    const response = customer.update(changes);
    return response;
  }
//delete customer
  async delete(id) {
    const customer = await this.findById(id);
    await customer.destroy();
    return { res: true };
  }
}


module.exports = CustomersService;
