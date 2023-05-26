
const { models } = require('../lib/sequelize');
const boom = require("@hapi/boom");

class CategoriesService{
  constructor() {  }

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }
  async find() {
    const response = await models.Category.findAll();
    return response;
  }

  async findById(id) {
    const category = models.Category.findByPk(id, {
      include: ['products']
    });
    if(!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findById(id);
    const response = category.update(changes);
    return response;
  }

  async delete(id) {
    const category = await this.findById(id);
    await category.destroy();
    return { id };
  }

}

module.exports = CategoriesService;
