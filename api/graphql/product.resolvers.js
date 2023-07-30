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

module.exports = { getProduct, getProducts, addProduct }
