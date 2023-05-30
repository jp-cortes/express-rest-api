require('dotenv').config({path: './.env'});

const { config } = require('./../config/config');
//prevent creating a differen client  on every connection

const { Pool } = require('pg');

const ProductionURI = process.env.DATABASE_URL;

const options = {};

if(config.isProd) {
  options.connectionString = ProductionURI;
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
