const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class UsersService {
  constructor() { }




  async find() {
    const response = await models.User.findAll();
    return response;
    // return this.users;
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async findById(id) {
    const user = models.User.findByPk(id);
    if(!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findById(id);
    const response = user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findById(id);
    await user.destroy();
    return { id };
  }
}


module.exports = UsersService;
