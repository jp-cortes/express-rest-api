const { Sequelize } = require('sequelize');

const { mySqlConfig } = require('../config/config');
const setupModels = require('../dataBase');

const USER = encodeURIComponent(mySqlConfig.dbUser);
const PASSWORD = encodeURIComponent(mySqlConfig.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${mySqlConfig.dbHost}:${mySqlConfig.dbPort}/${mySqlConfig.dbName}`
const URI = `mysql://${USER}:${PASSWORD}@${mySqlConfig.dbHost}:${mySqlConfig.dbPort}/${mySqlConfig.dbName}`

const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  // logging: true,
});

setupModels(sequelize);

sequelize.sync();


module.exports = sequelize;
