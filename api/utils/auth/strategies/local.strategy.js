const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('../../../sevices/users.services');
const service = new UserService();

const LocalStrategy = new Strategy({
  // change the  field from user to email
  usernameField: 'email',
  passwordField: 'password'
},
async (email, password, done) => {
  try {
    const user = await service.findByEmail(email);
    if(!user) {
      done(boom.unauthorized(), false);
    }
    //comparing the encrypted password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      done(boom.unauthorized(), false);
    }
    //delete the password from the response
    delete user.dataValues.password;
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}
);

module.exports = LocalStrategy;
