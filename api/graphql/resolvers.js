const { getProduct, getProducts, addProduct, updateProduct, deleteProduct } = require("./product.resolvers");
const { getCategories, addCategory, updateCategory, deleteCategory } = require('./category.resolvers');
const { addCustomer, updateCustomer, deleteCustomer } = require('./customer.resolvers');
const { login } = require('./auth.resolvers');

const resolvers = {
  Query: {
    hi: () => 'hello there',
    getPerson: (_, args) => `Hello, my name is ${args.name}, I am ${args.age} years old.`,
    getInt: (_, args) => args.age ,
    getFloat: (_, args) => args.price,
    getString: () => 'word',
    getBoolean: () => true,
    getId: () => '2324654',
    product: getProduct,
    products: getProducts,
    categories: getCategories
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
  }
 }

 module.exports = resolvers
