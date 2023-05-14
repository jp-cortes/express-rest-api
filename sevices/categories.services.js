const ProductsService = require('./products.services');

class CategoriesService extends ProductsService{
  constructor() {
    super();
  }

  async allCategories() {
    return this.categories()
  }

  async productsByCategory(category) {
    return this.findByCategory(category);
  }

}

module.exports = CategoriesService;
