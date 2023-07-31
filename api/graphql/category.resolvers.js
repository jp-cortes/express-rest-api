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

const  updateCategory = async(_, { id, dto }) => {
  const category = await service.update(id, dto);
  return category;
}

const  deleteCategory = async(_, { id }) => {
    await service.delete(id);
  return id;
}

module.exports = { getCategories, addCategory, updateCategory, deleteCategory }
