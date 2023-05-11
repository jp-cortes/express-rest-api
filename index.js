const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('My App');
});

app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  res.send({
    userId,
    name: 'Jhonny',
    role:' admin'
  });
});

app.get('/products', (req, res) => {
  res.send([
    {
      name: 'product 1',
      price: 1000
    },
    {
      name: 'product 2',
      price: 2000
    },
  ]);
});

app.get('/categories',  (req, res) => {
  const { categoryId } = req.params;
  res.send([
    {
      categoryId,
      title: 'clothes',
      products:[],
    },
    {
      categoryId,
      title: 'technology',
      products:[],
    },
    {
      categoryId,
      title: 'furniture',
      products:[],
    },
    {
      categoryId,
      title: 'food',
      products:[],
    },
  ]);
});

app.get('/categories/:categoryId',  (req, res) => {
  const { categoryId } = req.params;
  res.send(
    {
      categoryId,
      title: 'clothes',
      products:[],
    }
  )
})

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
