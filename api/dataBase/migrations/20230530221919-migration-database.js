'use strict';

const { DataTypes, Sequelize } = require('sequelize');

const { UserSchema, USER_TABLE } = require('../models/user.models');
const { CategorySchema, CATEGORY_TABLE } = require('../models/category.models');
const { ProductSchema, PRODUCT_TABLE } = require('../models/product.models');
const { CustomerSchema, CUSTOMER_TABLE } = require('../models/customer.models');
const { ORDER_TABLE } = require('../models/order.models');
const { ORDER_PRODUCT_TABLE } = require('../models/order-product.models');


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);


    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      paid: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      }
    }
    );
    //N:N Entity Relationships
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      orderId: {
        field: 'order_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ORDER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      productId: {
        field: 'product_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: PRODUCT_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    }
    );
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }
};
