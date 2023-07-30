const { getProduct, getProducts, addProduct } = require("./product.resolvers")
const { getCategories, addCategory } = require('./category.resolvers')

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
    addCategory
  }
 }

 module.exports = resolvers
