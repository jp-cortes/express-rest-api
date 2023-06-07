const express = require('express');
const passport =  require('passport');//authenticate jwt

const OrdersService = require('../services/orders.services');


const router = express.Router();
const service = new OrdersService();

//get order of a single user
router.get('/my-orders',
passport.authenticate('jwt', { session: false }),
async (req, res, next) => {
  try {
    const user = req.user;
    const orders = await service.findByUserId(user.sub);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
