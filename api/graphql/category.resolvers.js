const boom = require('@hapi/boom');
const { checkJwtGql } = require('../utils/checkJwtGql');
const { checkRolesGql } = require('../utils/checkRolesGql');

const CategoriesService = require('../services/categories.services');
const service = new CategoriesService();

const getCategories = async () => {
  const categories = await service.find({});
  return categories;
}
const getCategory = (_, { id }) => {
  return service.findOne(id);
}
const  addCategory = async(_, { dto }, context) => {
  const user = await checkJwtGql(context);
  checkRolesGql(user, 'admin');

  return service.create({
    ...dto,
    image: dto.image.href
  });
}

const  updateCategory = async(_, { id, dto }, context) => {
  const { user } = await context.authenticate('jwt', { session: false });
  if(!user) {
    throw boom.unauthorized();
  }
  return service.update(id, dto);
}

const  deleteCategory = async(_, { id }, context) => {
  const user = await checkJwtGql(context);
  checkRolesGql(user, 'admin');
  service.delete(id);
  return id;
}

module.exports = { getCategories, getCategory, addCategory, updateCategory, deleteCategory }
