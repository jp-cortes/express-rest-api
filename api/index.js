require('dotenv').config({path: './.env'});// first read the  .env variables

const cors = require('cors');// validate routes
const express = require('express');
const serverless = require('serverless-http');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorhandler } = require('./middlewares/error.handler');
const { checkApiKey } = require('./middlewares/auth.handler');



const app = express();
// const port = process.env.PORT;

app.use(express.json());

// example for specific url
// const whitelist = [`${process.env.SERVER}`, 'http://localhost:3000'];

// const corsOptionsDelegate = (req, callback) => {
//   let corsOptions;
// if (whitelist.indexOf(req.header('Origin')) !== -1) {
//   corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
// } else {
//   corsOptions = { origin: false } // disable CORS for this request
// }
// callback(null, corsOptions) // callback expects two parameters: error and options
// }

// app.use(cors(corsOptionsDelegate)); //access for the specific url

app.use(cors()); //access for all urls

//user authentication & authorization
require('./utils/auth');

app.get('/',checkApiKey, (req, res) => {
  res.send('Welcome Ecommerce REST API');
});


routerApi(app);


app.use(logErrors);
app.use(ormErrorhandler);
app.use(boomErrorHandler);
app.use(errorHandler);


// app.listen(port, () => {
//   console.log(`Listening on port http://localhost:${port}`);
// });
 module.exports = app;
 module.exports.handler = serverless(app);
