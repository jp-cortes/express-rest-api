const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const pool = require('../lib/postgres.pool');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (error) => console.log(error));
  }


  async generate() {
    const limit = 5;
    for( let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
        country: faker.location.country(),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        paymentMethods: {
          card: faker.finance.creditCardNumber(),
      },
        password: faker.internet.password(),

      });
    }
  }

  async find() {
    const query = 'SELECT * FROM task';
    const answer = await this.pool.query(query);
    return answer.rows;
    // return this.users;
  }

  async create(data) {
    const newUser = {
      id: faker.string.uuid(),
     ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  async findById(id) {
    const user = this.users.find((user) => user.id === id);
    if(!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if(index === -1) {
      throw boom.notFound('user not found');
    }

    const userData = this.users[index];
    this.users[index] = {
      ...userData,
      ...changes
    }
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if(index === -1) {
      throw boom.notFound('user not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}


module.exports = UsersService;
