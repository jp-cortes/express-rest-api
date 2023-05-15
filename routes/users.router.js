const express = require('express');
const UsersService = require('../sevices/users.services');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get('/:id',
validatorHandler(getUserSchema, 'params'),
 async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findById(id);
    res.status(200).json(user);
  } catch (error) {
    // res.status(404).json({
    //   message: error.message,
    // });
    next(error);
  }
});

router.post('/',
validatorHandler(createUserSchema, 'body'),
async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
validatorHandler(getUserSchema, 'params'),
validatorHandler(updateUserSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(id, body);

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
validatorHandler(getUserSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.delete(id);

    res.json(user);
  } catch (error) {
    next(error);
  }
});

//?limit=10&offset=10
// router.get('/', (req, res) => {
//   const { limit, offset } = req.query;
//   if(limit && offset) {
//     res.send({
//       limit,
//       offset
//     });

//   } else {
//     res.send('No parameters')
//   }
// });

module.exports = router;
