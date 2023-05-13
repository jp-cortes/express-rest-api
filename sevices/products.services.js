const { faker } = require('@faker-js/faker');

class ProductsService {
  construtor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for( let i = 0; i < limit; i++) {
      this.products.push({
        // eslint-disable-next-line no-undef
        id: crypto.randomUUID(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url(),
        description: faker.commerce.productDescription(),
        category:  faker.commerce.department()
      });
    }

  }

  create(data) {
    const newProduct = {
      // eslint-disable-next-line no-undef
      id: crypto.randomUUID(),
      ...data
    }
     this.products.push(newProduct);
     return newProduct;
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((item) => item.id === id);
  }

  categories() {
    return this.products.map((items) => items.category);
  }

  findByCategory(category) {
    return this.products.filter((item) => item.category === category);
  }

  update(id, changes) {
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

  delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if(index === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
