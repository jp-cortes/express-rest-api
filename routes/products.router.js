const { faker } = require('@faker-js/faker');
const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for( let i = 0; i < limit; i++) {
    products.push({
      id: products.length + 1,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.url(),
      category:  faker.commerce.department()
    });
  }
   res.json(products);

  });

  router.get('/:id',  (req, res) => {
    const { id } = req.params;
    if(id === 111) {
      res.status(404).json({
        message: 'not found'
      })
    } else {

      res.status(200).json(
        {
          id,
          title: 'product 1',
          price: 213,
        }
      )
    }
    });

  router.post('/', (req, res) => {
        const body = req.body;
    res.status(201).json({
      message: 'created',
      data: body,
     });
  });

  router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    res.json({
      message: 'updated',
      data: body,
      id,
    });
  });

  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
      message: 'deleted',
      id
    });
  });

  module.exports = router;
