
const express = require('express');
const UsersService = require('../sevices/users.services');

const router = express.Router();
const service = new UsersService()


router.get('/', async (req, res) => {
 const users = await service.find();
   res.json(users);

  });

router.get('/:id',  async (req, res) => {
    try {
      const { id } = req.params;
    const user = await service.findById(id);
      res.status(200).json(user);
    } catch(error) {
      res.status(404).json({
        message: error.message
      });
    }
    });

router.post('/', async (req, res) => {
       try {
          const body = req.body;
        const newUser = await service.create(body);
        res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json({
          message: error.message
        })
      }
  });

  router.patch('/:id', async (req, res) => {
    try {
      const { id } = req.params;
    const body = req.body;
    const user = await service.update(id, body);

    res.json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
    const user = await service.delete(id);

    res.json(user);
  } catch(error) {
    res.status(404).json({
      message: error.message
    });
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
