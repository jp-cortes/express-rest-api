const ProductsService = require('./products.services');
const { models } = require('../lib/sequelize');
const boom = require("@hapi/boom");

class CategoriesService extends ProductsService {
  constructor() {
    super();
  }

  async allCategories() {
    const response = await models.Category.findAll();
    return response;
  }

  async findById(id) {
    const product = models.Category.findByPk(id);
    if(!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async findProductsByCategory(categoryId) {
    const category = await this.findByCategory(categoryId)
    return category;
  }

}

module.exports = CategoriesService;
