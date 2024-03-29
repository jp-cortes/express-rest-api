const express = require('express');
const passport = require('passport');//authenticate jwt

const UsersService = require('../services/users.services');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new UsersService();

//all users
router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

//user by id
router.get('/account',
validatorHandler(getUserSchema, 'params'),
 async (req, res, next) => {
  try {
    const id = { userId:req.user.sub };
    const user = await service.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);// will show the error from the middleware folder
  }
});

//create a user
router.post('/',
validatorHandler(createUserSchema, 'body'),
async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);// will show the error from the middleware folder
  }
});


//update an user
router.patch('/:id',
passport.authenticate('jwt', { session: false }),
checkRoles('admin'),
validatorHandler(getUserSchema, 'params'),
validatorHandler(updateUserSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(id, body);

    res.json(user);
  } catch (error) {
    next(error);// will show the error from the middleware folder
  }
});

//delete an user
router.delete('/:id',
passport.authenticate('jwt', { session: false }),
validatorHandler(getUserSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.delete(id);

    res.json(user);
  } catch (error) {
    next(error);// will show the error from the middleware folder
  }
});

module.exports = router;
