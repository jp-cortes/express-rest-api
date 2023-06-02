const express = require('express');
const passport = require('passport');//authenticate jwt

const CustomerService = require('../sevices/customers.services');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.get('/',
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});


router.get('/:id',
validatorHandler(getCustomerSchema),
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await service.findById(id);
    res.status(404).json(customer);
  } catch (error) {
    next(error);
  }
});


router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
passport.authenticate('jwt', { session: false }),
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
