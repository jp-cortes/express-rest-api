const { Pool } = require('pg');
//prevent creating a differen client  on every connection
const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

  const pool = new Pool({ connectionString: URI });



module.exports = pool;
