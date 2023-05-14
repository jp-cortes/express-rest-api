const express = require('express');
const ProductsService = require('../sevices/products.services');


const router = express.Router();
const service = new ProductsService();



router.get('/', async (req, res) => {
  const products = await service.find();
   res.status(200).json(products);
  });

  router.get('/:id',  async (req, res) => {
    try {
      const { id } = req.params;
    const product = await service.findOne(id);

      res.status(200).json(product);
    } catch(error) {
      res.status(404).json({
        message: error.message
      });
    }
  });


  router.post('/', async (req, res) => {
       try {
        const body = req.body;
        const newProduct = await service.create(body);

    res.status(201).json(newProduct);
  } catch(error) {
    res.status(404).json({
      message: error.message
    });
  }
  });

  router.patch('/:id', async (req, res) => {
 try {
  const { id } = req.params;
  const body = req.body;

  const productUpdate = await service.update(id, body);

  res.json(productUpdate);
 } catch (error) {
  res.status(404).json({
    message: error.message
  });

 }
  });

  router.delete('/:id', async (req, res) => {
   try {
      const { id } = req.params;
    const product = await service.delete(id);

    res.json(product);
  } catch(error) {
    res.status(404).json({
      message: error.message
    });
  }
  });

  module.exports = router;
