const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class UsersService {
  constructor() { }



//find  all users
  async find() {
    const response = await models.User.findAll({
      include: ['customer']
    });
    return response;
  }
//create user
  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }
//find  user by id
  async findByEmail(email) {
    const user = models.User.scope('withPassword').findOne({ where: { email }});
    if(!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }
//find  user by id
  async findById(id) {
    const user = models.User.findByPk(id,{
      include: ['customer']
      });
    if(!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }
// update user
  async update(id, changes) {
    const user = await this.findById(id);
    const response = user.update(changes);
    return response;
  }
// delete user
  async delete(id) {
    const user = await this.findById(id);
    await user.destroy();
    return { res: true };
  }
}


module.exports = UsersService;
