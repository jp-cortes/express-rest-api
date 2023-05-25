const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');
// const pool = require('../lib/postgres.pool');

class ProductsService {
  constructor() {}


  async find() {
    const response = await models.Product.findAll();
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


   async findByCategory(categoryId) {
    const category = models.Product.findAll({
      where:{
        'category_id': categoryId
      }
    });

    if(!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }
}


module.exports = ProductsService;
