const ProductsService = require('../services/products.services');

const service = new ProductsService();

const getProduct = async (_, { id }) => {
  const product = await service.findById(id);
  return product;
}

const getProducts = async() => {
  const products = await service.find({});
  return products;
}

const  addProduct = async(_, { dto }) => {
  const newProduct = await service.create(dto);
  return newProduct;
}

const  updateProduct = async(_, { id, dto }) => {
  const product = await service.update(id, dto);
  return product;
}

const  deleteProduct = async(_, { id }) => {
    await service.delete(id);
  return id;
}

const getProductsByCategory = (parent) => {
  const id = parent.dataValues.id;
  return service.getByCategory(id);// dynamic call is an optional call in getCategory
}

module.exports = { getProduct, getProducts, addProduct, updateProduct, deleteProduct, getProductsByCategory }
