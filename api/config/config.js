require('dotenv').config({path: '../.env'});

const config = {
  env: process.env.NODE_ENV || 'dev',
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME
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
