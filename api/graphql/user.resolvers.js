const { checkJwtGql } = require('../utils/checkJwtGql');
const { checkRolesGql } = require('../utils/checkRolesGql');


const UsersService = require('../services/users.services');
const service = new UsersService();

const getUsers = async(_, __, context) => {
  const role = await checkJwtGql(context);
  checkRolesGql(role, 'admin');
  const users = await service.find({});
  return users;
}

const getUser = async(_, __, context) => {
  const data = await checkJwtGql(context);
  const id = { userId: data.sub}
  const user = await service.findById(id);
  return user;
}


const  addUser = async(_, { dto }) => {
  const newCustomer = await service.create(dto);
  return newCustomer;
}

const  updateUser = async(_, { id, dto }, context) => {
  await checkJwtGql(context);
  const customer = await service.update(id, dto);
  return customer;
}

const  deleteUser = async(_, { id }) => {
    await service.delete(id);
  return id;
}

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser }
