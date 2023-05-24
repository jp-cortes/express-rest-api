require('dotenv').config({path: '../.env'});

const config = {
  env: process.env.NODE_ENV || 'dev',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || '5432',
  dbUser: process.env.DB_USER || 'alias',
  dbPassword: process.env.DB_PASSWORD || 'Alias404',
  dbName: process.env.DB_NAME || 'mystore'
};
const mySqlConfig = {
  env: process.env.NODE_ENV || 'dev',
  dbHost: process.env.DB_SQL_HOST,
  dbPort: process.env.DB_SQL_PORT,
  dbUser: process.env.DB_SQL_USER,
  dbPassword: process.env.DB_SQL_PASSWORD,
  dbName: process.env.DB_SQL_NAME
};

module.exports = { config, mySqlConfig }
