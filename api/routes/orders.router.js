const express = require('express');

const OrdersService = require('../sevices/orders.services');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  getOrderSchema,
  updateOrderSchema,
  addItemSchema,
} = require('../schemas/order.schema');

const router = express.Router();
const orders = new OrdersService();

router.get('/',  async (req, res, next) => {
  try {
    res.json(await orders.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
   async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await orders.findById(id);

      res.status(200).json(order);
    } catch(error) {
      next(error);// will show the error from the middleware folder
    }
  });

router.post('/',
validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await orders.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
validatorHandler(getOrderSchema, 'params'),
validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await orders.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await orders.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

//relation  N:N order-product
router.post('/add-item',
validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await orders.addItem(body));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
