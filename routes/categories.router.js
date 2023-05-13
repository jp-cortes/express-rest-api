const express = require('express');
const CategoriesService = require('../sevices/categories.services');
const router = express.Router();
const category = new CategoriesService();


router.get('/',  (req, res) => {
  const categories = category.findCategories();
  res.json(categories);
})

router.get('/:id',  (req, res) => {
  const { id } = req.params;
  const productByCategory = category.filterByCategory(id);
  res.json(productByCategory)
});

module.exports = router;
