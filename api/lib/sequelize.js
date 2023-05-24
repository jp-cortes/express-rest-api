const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../dataBase/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const URI = `mysql://${USER}:${PASSWORD}@${mySqlConfig.dbHost}:${mySqlConfig.dbPort}/${mySqlConfig.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize);

// sequelize.sync();
//is considered a abad practice for production


module.exports = sequelize;
