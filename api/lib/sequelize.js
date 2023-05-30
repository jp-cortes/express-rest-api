const { config } = require('../config/config');

const { Sequelize } = require('sequelize');
const setupModels = require('../dataBase/models');

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
};

if(config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);



module.exports = sequelize;
