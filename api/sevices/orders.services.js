const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class OrdersService {
  constructor() { }

  async find() {
    const response = await models.Order.findAll();
    return response;
    // return this.users;
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async findById(id) {
    const order = models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    if(!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, changes) {
    const order = await this.findById(id);
    const response = order.update(changes);
    return response;
  }

  async delete(id) {
    const order = await this.findById(id);
    await order.destroy();
    return { res: true };
  }
}


module.exports = OrdersService;
