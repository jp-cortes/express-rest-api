
const { models } = require('../lib/sequelize');

const boom = require("@hapi/boom");

class CategoriesService{
  constructor() { }
  // find all caregories
  async find() {
    const response = await models.Category.findAll();
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
