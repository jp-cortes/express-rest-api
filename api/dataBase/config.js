require('dotenv').config({path: './.env'});



const URI = process.env.DATABASE_URL;


module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  }
}
