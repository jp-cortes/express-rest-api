const boom = require('@hapi/boom');
const CategoriesService = require('../services/categories.services');
const service = new CategoriesService();

const getCategories = async () => {
  const categories = await service.find({});
  return categories;
}
const  addCategory = async(_, { dto }, context) => {
  const { user} = await context.authenticate('jwt', { session: false });
  if(!user) {
    throw boom.unauthorized();
  }
  return service.create(dto);
}

const  updateCategory = async(_, { id, dto }, context) => {
  const { user} = await context.authenticate('jwt', { session: false });
  if(!user) {
    throw boom.unauthorized();
  }
  return service.update(id, dto);
}

const  deleteCategory = async(_, { id }, context) => {
  const { user} = await context.authenticate('jwt', { session: false });
  if(!user) {
    throw boom.unauthorized();
  }
  service.delete(id);
  return id;
}

module.exports = { getCategories, addCategory, updateCategory, deleteCategory }
