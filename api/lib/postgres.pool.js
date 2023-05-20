require('dotenv').config({path: './.env'});// first read the  .env variables

const { Pool } = require('pg');
//prevent creating a differen client  on every connection

  const pool = new Pool({

    host: 'localhost',
    port: 5432,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: 'mystore'
  });



module.exports = pool;
