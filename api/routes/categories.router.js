const express = require('express');
const CategoriesService = require('../sevices/categories.services');
const router = express.Router();
const category = new CategoriesService();
const validatorHandler = require('../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/category.schema.js')



//get all categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await category.find();
  res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

//show product by category
router.get('/:id',
validatorHandler(getCategorySchema),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const productByCategory = await category.findById(id);
    res.status(404).json(productByCategory);
  } catch (error) {
    next(error);
  }
});
 //create category
router.post('/',
validatorHandler(createCategorySchema, 'body'),
 async (req, res, next) => {
     try {
      const body = req.body;
      const newCategory = await category.create(body);

  res.status(201).json(newCategory);
} catch(error) {
  next(error);// will show the error from the middleware folder
}
});

//update a category
router.patch('/:id',
validatorHandler(getCategorySchema, 'params'),
validatorHandler(updateCategorySchema, 'body'),
async (req, res, next) => {
try {
const { id } = req.params;
const body = req.body;

const productUpdate = await category.update(id, body);

res.json(productUpdate);
} catch (error) {
next(error);// will show the error from the middleware folder

}
});


//delete a category
router.delete('/:id',
validatorHandler(getCategorySchema, 'params'),
async (req, res, next) => {
 try {
    const { id } = req.params;
  const product = await category.delete(id);

  res.json(product);
} catch(error) {
  next(error);// will show the error from the middleware folder
}
});



module.exports = router;
