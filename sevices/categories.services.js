const { faker } = require('@faker-js/faker');
const ProductsService = require('./products.services');

class CategoriesService extends ProductsService{
  constructor() {
    super();
  }

  findCategories() {
    return this.categories()
  }

  filterByCategory(category) {
    return this.findByCategory(category);
  }

}

module.exports = CategoriesService;
