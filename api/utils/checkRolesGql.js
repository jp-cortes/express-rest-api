const boom = require('@hapi/boom');

function checkRolesGql(user, ...roles) {
  if(!roles.includes(user.role)) {
    throw boom.unauthorized("Role not valid");
  }
  return user;
}

 module.exports = { checkRolesGql };
