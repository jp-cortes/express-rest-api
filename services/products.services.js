const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');
const { Op } = require('sequelize');
// const { faker } = require('@faker-js/faker');

class ProductsService {
  constructor() {}


  // can be use to generate  the first products in the database
  async generate() {
    //before runnig you must create categories otherwise the database will crash
    const limit = 9;
    for (let index = 0; index < limit; index++) {
      this.create({
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.urlLoremFlickr({category: 'beauty'}),// use the category so the image will be related
        description: faker.commerce.productDescription(),
        categoryId: 9 // was made by every category from 1 to 9
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



}


module.exports = ProductsService;
