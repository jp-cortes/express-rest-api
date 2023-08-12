const { getProduct, getProducts, addProduct, updateProduct, deleteProduct, getProductsByCategory } = require("./product.resolvers");
const { getCategories, getCategory, addCategory, updateCategory, deleteCategory } = require('./category.resolvers');
const { addCustomer, updateCustomer, deleteCustomer, getCustomers, getCustomer } = require('./customer.resolvers');
const { login } = require('./auth.resolvers');
const { getOrders, addOrder, addProductToOrder } = require('./order.resolvers');
const { RegularExpression } = require('graphql-scalars');

const CategoryNameType = new RegularExpression('CategoryNameType', /^[a-zA-Z0-9]{3,8}$/);

const resolvers = {
  Query: {
    product: getProduct,
    products: getProducts,
    category: getCategory,
    categories: getCategories,
    customer: getCustomer,
    customers: getCustomers,
    order: getOrders,
  },
  Mutation: {
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    login,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addOrder,
    addItem: addProductToOrder,
  },
  CategoryNameType,
  Category: {
    products: getProductsByCategory,
  },
 }

 module.exports = resolvers
