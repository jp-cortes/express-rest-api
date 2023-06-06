const { config } = require('./../config/config');
//prevent creating a differen client  on every connection

const { Pool } = require('pg');


const options = {};

if(config.isProd) {
  options.connectionString = config.dbUrl;
  options.ssl = {
    rejectUnauthorized: false
  };
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
  options.connectionString = URI
}


  const pool = new Pool(options);



module.exports = pool;
