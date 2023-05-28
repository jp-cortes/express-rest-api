const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class OrdersService {
  constructor() { }
// find  all orders
  async find() {
    const response = await models.Order.findAll();
    return response;
    // return this.users;
  }
//create order
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
//find order by id
  async findById(id) {
    const order = models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
         'items'
      ]
    });
    if(!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }
//update order
  async update(id, changes) {
    const order = await this.findById(id);
    const response = order.update(changes);
    return response;
  }
//delte order
  async delete(id) {
    const order = await this.findById(id);
    await order.destroy();
    return { res: true };
  }

// relation N:M order-product
  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }
}


module.exports = OrdersService;
