const CategoriesService = require('../services/categories.services');


const service = new CategoriesService();
const getCategories = async () => {
  const categories = await service.find({});
  return categories;
}
const  addCategory = async(_, { dto }) => {
  const newCategory = await service.create(dto);
  return newCategory;
}

module.exports = { getCategories, addCategory }
