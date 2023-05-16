const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  //schema will validate the schemas placed on folder schemas
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });

    if(error) {
      next(boom.badRequest(error));
    }
      next(); //if there is no error keep going
  }
}


module.exports = validatorHandler;
