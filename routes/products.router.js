const express = require('express');
const ProductsService = require('../sevices/products.services');


const router = express.Router();
const service = new ProductsService();



router.get('/', (req, res) => {
  const products = service.find();
   res.json(products);

  });

  router.get('/:id',  (req, res) => {
    const { id } = req.params;
    const product = service.findOne(id);
    if(!id) {
      res.status(404).json({
        message: 'not found'
      })
    } else {

      res.status(200).json(product);
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
