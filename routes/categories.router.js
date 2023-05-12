const express = require('express');

const router = express.Router();


router.get('/',  (req, res) => {
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

router.get('/:categoryId',  (req, res) => {
  const { categoryId } = req.params;
  res.send(
    {
      categoryId,
      title: 'clothes',
      products:[],
    }
  )
});

module.exports = router;
