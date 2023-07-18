const express = require('express');
const passport =  require('passport');//authenticate jwt

const OrdersService = require('../services/orders.services');


const router = express.Router();
const service = new OrdersService();

//get order of a single user
// profile/my-orders/:id
router.get('/my-orders/:id',
passport.authenticate('jwt', { session: false }),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const orders = await service.findByUserId(id);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
