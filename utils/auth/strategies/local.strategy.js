const { Strategy } = require('passport-local');

const AuthService = require('../../../services/auth.services');
const service = new AuthService();

const LocalStrategy = new Strategy({
  // change the  field from user to email
  usernameField: 'email',
  passwordField: 'password'
},
async (email, password, done) => {
  try {
    const user = await service.getUser(email, password);
      done(null, user)
  } catch (error) {
    done(error, false);
  }
}
);

module.exports = LocalStrategy;
