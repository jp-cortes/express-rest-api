const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');
const { Op } = require('sequelize');
const { faker } = require('@faker-js/faker');

class ProductsService {
  constructor() {}


  // can be use to generate  the first product of the database
  async generate() {
    //before runnig you must create  minimun 10 categories otherwise the database will crash
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.create({
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        description: faker.commerce.productDescription(),
        categoryId:faker.number.int({ min:1, max: 10 })
      });
    }
  }

  //find  all products
  async find(query) {
    const options = {
      include: ['category']
    }
    //pagination
    const { limit, offset } = query;
    if(limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    //show by an specific price
    const { price } = query;
    if(price) {
      options.where.price = price;
    }

    //show by a price range
    const { min_price, max_price } = query;
    if(min_price && max_price) {
      options.where.price = {
        [Op.gte]: min_price,
        [Op.lte]: max_price,
      };
    }

    const response = await models.Product.findAll(options);

    return response;
  }
//create product
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }
//find product by id
  async findById(id) {
    const product = models.Product.findByPk(id);
    if(!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }
//update product
  async update(id, changes) {
    const product = await this.findById(id);
    const response = product.update(changes);
    return response;
  }
//delete product
  async delete(id) {
    const product = await this.findById(id);
    await product.destroy();
    return { res: true };
  }

 async getByCategory(id) {
  return await models.Product.findAll({ where: { categoryId: id }});
 }

}


module.exports = ProductsService;
