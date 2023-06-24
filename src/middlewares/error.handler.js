/* eslint-disable no-unused-vars */
const { ValidationError } = require('sequelize');
// create function to  reach a middleware error type
function logErrors( error, req, res, next) {
  //show the error in server  for monitoring
  console.error(error);

  //mandatory send the error in the next()
  //if  is sent empty will be send a s a normal  middleware
  next(error);
}

//create  a format to return to the client as a complement to the previous function
function errorHandler( error, req, res, next) {
//even if you don't use  next you must place it as a parameter
  res.status(500).json({// show there is a error 500 Internal server error
    message: error.message,//show the client the error message
    stack: error.stack,// show the info of the  error
  });
}

function boomErrorHandler( error, req, res, next) {
if(error.isBoom) {// boom libray add the property IsBoom
  //if the  error is type boom
  const { output } = error;
  //the status code is dynamic taken from the files in folder services
  res.status(output.statusCode).json(output.payload);
} else {
  next(error);// if the error isn't type boom will be handle by the errorHandler function

}

}

function ormErrorhandler(error, req, res, next) {
  if(error instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: error.name,
      errors: error.errors
    })
  }
  next(error);
}



module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorhandler };
