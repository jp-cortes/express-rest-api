require('dotenv').config({ path: '../.env' });

//postgres config
const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  dbPort: process.env.DB_PORT || 3000,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbUrl: process.env.DATABASE_URL,
};

//mysql config
// const mySqlConfig = {
//   env: process.env.NODE_ENV || 'dev',
//   dbHost: process.env.DB_SQL_HOST,
//   dbPort: process.env.DB_SQL_PORT,
//   dbUser: process.env.DB_SQL_USER,
//   dbPassword: process.env.DB_SQL_PASSWORD,
//   dbName: process.env.DB_SQL_NAME,
//   dbUrl: process.env.DATABASE_URL,
// };

module.exports = { config }
