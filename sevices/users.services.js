const { faker } = require('@faker-js/faker');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  async generate() {
    const limit = 50;
    for( let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        image: faker.image.avatar(),
        country: faker.location.country(),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        paymentMethods: {
          card: faker.finance.creditCardNumber(),
      }

      });
    }
  }

  async find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users);
      }, 3000);
    })
  }

  async create(data) {

    if(data.name === undefined || data.lastname === undefined){
      throw new Error('User must have a name and lastname');
    }
    const newUser = {
      id: faker.string.uuid(),
     ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  async findById(id) {
    const user = this.users.find((user) => user.id === id);
    if(user === undefined) {
      throw new Error('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if(index === -1) {
      throw new Error('user not found');
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
      throw new Error('user not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}


module.exports = UsersService;
