const { faker } = require('@faker-js/faker');
const express = require('express');

const router = express.Router();



router.get('/', (req, res) => {
  const users = [];
  const { size } = req.query;
  const limit = size || 10;
  for( let i = 0; i < limit; i++) {
    users.push({
      id: users.length + 1,
      name: faker.person.firstName(),
      lastname: faker.person.lastName(),
      image: faker.image.avatar(),
    });
  }
   res.json(users);

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
