const express = require('express');
const routerApi = require('./routes');


const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('My App');
});

routerApi(app);




app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
