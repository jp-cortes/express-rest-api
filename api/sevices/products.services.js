const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for( let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        description: faker.commerce.productDescription(),
        category:  faker.commerce.department().toLowerCase(),
      });
    }

  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
     this.products.push(newProduct);
     return newProduct;
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);

    if(!product) {
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async categories() {
      const allCategories = this.products.map((items) => items.category);
      return [...new Set(allCategories)];

  }

  async findByCategory(category) {
     return this.products.filter((item,) => item.category === category);

  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if(index === -1) {
      throw boom.notFound('Product not found');
    }

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    }
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if(index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}


module.exports = ProductsService;
