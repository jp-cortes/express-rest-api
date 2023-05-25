const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class CustomersService {
  constructor() { }

  async find() {
    const response = await models.Customer.findAll({
      include: ['user']
    });
    return response;
    // return this.users;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;
  }

  async findById(id) {
    const customer = models.Customer.findByPk(id);
    if(!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findById(id);
    const response = customer.update(changes);
    return response;
  }

  async delete(id) {
    const customer = await this.findById(id);
    await customer.destroy();
    return { res: true };
  }
}


module.exports = CustomersService;
