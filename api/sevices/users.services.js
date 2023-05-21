const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class UsersService {
  constructor() { }


  async generate(data) {
    return data;
  }

  async find() {
    const response = await models.User.findAll();
    return response;
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
