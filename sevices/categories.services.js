const ProductsService = require('./products.services');
const boom = require("@hapi/boom");

class CategoriesService extends ProductsService{
  constructor() {
    super();
  }

  async allCategories() {
    return this.categories()
  }

  async productsByCategory(category) {
    const product = this.findByCategory(category);
    if(product.length) {
      throw boom.notFound('Category not found');
    }

    return product;
  }

}

module.exports = CategoriesService;
