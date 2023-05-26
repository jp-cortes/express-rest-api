const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');
// const pool = require('../lib/postgres.pool');
const { faker } = require('@faker-js/faker')
class ProductsService {
  constructor() {}

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        description: faker.commerce.productDescription()
      });
    }
  }
  async find() {
    const response = await models.Product.findAll({
      include: ['category']
    });
    return response;
    // return this.users;
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async findById(id) {
    const product = models.Product.findByPk(id);
    if(!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findById(id);
    const response = product.update(changes);
    return response;
  }

  async delete(id) {
    const product = await this.findById(id);
    await product.destroy();
    return { id };
  }



}


module.exports = ProductsService;
