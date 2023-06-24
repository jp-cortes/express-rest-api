const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.startegy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);
