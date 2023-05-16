const express = require('express');
const CategoriesService = require('../sevices/categories.services');
const router = express.Router();
const category = new CategoriesService();

//get all categories
router.get('/', async (req, res) => {
  const categories = await category.allCategories();
  res.json(categories);
});

//show product by category
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const productByCategory = await category.productsByCategory(id);
    res.json(productByCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
