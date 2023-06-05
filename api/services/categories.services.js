
const { models } = require('../lib/sequelize');
const { faker } = require('@faker-js/faker');

const boom = require("@hapi/boom");

class CategoriesService{
  constructor() { }

  async generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.create({
        name: faker.commerce.department(),
        image: faker.image.url(),
      });
    }
  }

  // find all categories

  async find() {
    const response = await models.Category.findAll();

     //if thera are no categories will generate by default
     if(response.length === 0){
      return await this.generate();
    }

    return response;
  }
// create category
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }
// product by category id
  async findById(id) {
    const category = models.Category.findByPk(id, {
      include: ['products']
    });
    if(!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }
//update category
  async update(id, changes) {
    const category = await this.findById(id);
    const response = category.update(changes);
    return response;
  }
//delete category
  async delete(id) {
    const category = await this.findById(id);
    await category.destroy();
    return { res: true };
  }

}

module.exports = CategoriesService;
