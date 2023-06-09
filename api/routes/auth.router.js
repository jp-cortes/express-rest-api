const express = require('express');
const passport = require('passport');
const { loginAuthSchema, recoveryAuthSchema, changePasswordSchema } = require('../schemas/auth.schema');
const validatorHandler = require('../middlewares/validator.handler');
const AuthService = require('../services/auth.services');

const router = express.Router();
const service = new AuthService();

//loging user
router.post('/login',
validatorHandler(loginAuthSchema),
 passport.authenticate('local', { session: false }),
 async (req, res, next) => {
  try {
    const user = req.user;
    res.json(service.signToken(user));
  } catch (error) {
    next(error);
  }
});
//recovery password email
router.post('/recovery',
validatorHandler(recoveryAuthSchema),
 async (req, res, next) => {
  try {
    const { email } = req.body;
    const recoveryEmail = await service.sendRecoveryMail(email);
    res.json(recoveryEmail);
  } catch (error) {
    next(error);
  }
});
//change password
router.post('/change-password',
validatorHandler(changePasswordSchema),
 async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const recoveryEmail = await service.changePassword(token, newPassword);
    res.json(recoveryEmail);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
