const { faker } = require('@faker-js/faker');


class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for( let i = 0; i < limit; i++) {
      this.products.push({
        // eslint-disable-next-line no-undef
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
      // eslint-disable-next-line no-undef
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

    if(product === undefined) {
      throw new Error('Product not found');
    }
    return product;
  }

  async categories() {
      return this.products.map((items) => items.category);

  }

  async findByCategory(category) {
    return this.products.filter((item) => item.category === category);
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if(index === -1) {
      throw new Error('Product not found');
    }

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if(index === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}


module.exports = ProductsService;
