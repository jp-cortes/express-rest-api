require('dotenv').config({path: './.env'});
const boom = require('@hapi/boom');

const API_KEY = process.env.DATABASE_API_KEY;

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if(apiKey === API_KEY) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if(roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }
}

module.exports = { checkApiKey, checkRoles };
