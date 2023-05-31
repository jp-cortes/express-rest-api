
require('dotenv').config({path: './.env'});// first read the  .env variables
const cors = require('cors');// validate routes
const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorhandler } = require('./middlewares/error.handler');
const { checkApiKey } = require('./middlewares/auth.handler');



const app = express();
const port = process.env.PORT;

app.use(express.json());

// example for specific url
const whitelist = [`${process.env.SERVER}`, 'http://localhost:3000'];

const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  }
}

// app.use(cors(options)); //access fot the specific url
app.use(cors()); //access for all urls



app.get('/', checkApiKey, (req, res) => {
  res.send('Ecommerce REST API');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorhandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
