const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class OrdersService {
  constructor() { }
// find  all orders
  async find() {
    const response = await models.Order.findAll();
    return response;

  }
//create order
  async create(data) {
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    });

    if(!customer) {
      throw boom.notFound('customer not found');
    }

    const newOrder = await models.Order.create({
      customerId: customer.id,
      status: data.status,
      paid: data.paid
    });

    return newOrder;
  }
//find order by user id
  async findByUserId(data) {
    const order = models.Order.findAll({
      where: {
        '$customer.user.id$': data.userId
      },
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
    const newItem = await models.OrderProduct.create({
      orderId: data.orderId,
      productId: data.productId,
      amount: data.amount
    });
    return newItem;
  }
}


module.exports = OrdersService;
