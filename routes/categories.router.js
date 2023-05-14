const express = require('express');
const CategoriesService = require('../sevices/categories.services');
const router = express.Router();
const category = new CategoriesService();


router.get('/',  async (req, res) => {
  const categories = await category.allCategories();
  res.json(categories);
})

router.get('/:id',  async (req, res) => {
  try {
    const { id } = req.params;
  const productByCategory = await category.productsByCategory(id);
  res.json(productByCategory);
} catch(error) {
  res.status(404).json({
    message: error.message
  });
}
});

module.exports = router;
