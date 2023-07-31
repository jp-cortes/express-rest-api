const { config } = require('../config/config');

const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('./users.services');
const service = new UserService();

class AuthService {
  constructor() {}

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if(!user) {
      throw boom.unauthorized();
     }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
     throw boom.unauthorized();
    }
    //delete the password from the response
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;

  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret)
    return {
      user,
      token
    };
  }

  async sendRecoveryMail(email) {
    const user = await service.findByEmail(email);
    if(!user) {
      throw boom.serverUnavailable();
     }
     const payload = { sub: user.id };
     const token = jwt.sign(payload, config.jwtRecovery, { expiresIn: '15min'});
     const link = `${config.frontEndUrl}/recovery?token=${token}`;
     await service.update(user.id, { recoveryToken: token });
     // send mail with defined transport object
     const mail = {
      from: config.nodeMailer.user, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Reset your E-store password (test)", // Subject line
      text: "Reset your E-store password (test)", // plain text body
      html: `<a href='${link}'>CLick here to recover your password</a>`, // html body
     };

     const response = await this.sendMail(mail);
     return response;

  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtRecovery);
    const user = await service.findById(payload.sub);
    if(user.recoveryToken !== token) {
      throw boom.unauthorized();
    }
    const hash = await bcrypt.hash(newPassword, 10);
    await service.update(user.id, { recoveryToken: null, password: hash });
    return { message: 'password updated', response: true };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: config.nodeMailer.host,
      port: config.nodeMailer.port,
      secure: true,
      auth: {
        user: config.nodeMailer.user,
        pass: config.nodeMailer.password,
      },
     });
     await transporter.sendMail(infoMail);

  return { message: 'mail sent'};
  }
}


module.exports = AuthService;
