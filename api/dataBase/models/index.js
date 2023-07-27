const  { User, UserSchema } = require('./user.models');
const  { Customer, CustomerSchema } = require('./customer.models');
const  { Product, ProductSchema } = require('./product.models');
const  { Category, CategorySchema } = require('./category.models');
const  { Order, OrderSchema } = require('./order.models');
const  { OrderProduct, OrderProductSchema } = require('./order-product.models');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;
