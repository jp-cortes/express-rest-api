const express = require('express');
const ProductsService = require('../sevices/products.services');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
   updateProductSchema,
    getProductSchema,
    queryProductSchema
  } = require('../schemas/product.schema');


const router = express.Router();
const service = new ProductsService();


//all products
router.get('/',
validatorHandler(queryProductSchema, 'query'),
async (req, res) => {
  const products = await service.find(req.query);
   res.status(200).json(products);
  });

  //product by id
  router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
   async (req, res, next) => {
    try {
      const { id } = req.params;
    const product = await service.findById(id);

      res.status(200).json(product);
    } catch(error) {
      next(error);// will show the error from the middleware folder
    }
  });

//create products
  router.post('/',
  validatorHandler(createProductSchema, 'body'),
   async (req, res, next) => {
       try {
        const body = req.body;
        const newProduct = await service.create(body);

    res.status(201).json(newProduct);
  } catch(error) {
    next(error);// will show the error from the middleware folder
  }
  });

  //update a product
  router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
 try {
  const { id } = req.params;
  const body = req.body;

  const productUpdate = await service.update(id, body);

  res.json(productUpdate);
 } catch (error) {
  next(error);// will show the error from the middleware folder

 }
  });


  //delete a product
  router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
   try {
      const { id } = req.params;
    const product = await service.delete(id);

    res.json(product);
  } catch(error) {
    next(error);// will show the error from the middleware folder
  }
  });

  module.exports = router;
