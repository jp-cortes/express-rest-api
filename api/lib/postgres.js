require('dotenv').config({path: './.env'});// first read the  .env variables

const { Client } = require('pg');

async function getConnection () {
  const client = new Client({

    host: 'localhost',
    port: 5432,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: 'mystore'
  });
  await client.connect();
  return client;
}


module.exports = getConnection;
