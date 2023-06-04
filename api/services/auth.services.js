require('dotenv').config({path: './.env'});// first read the  .env variables
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

  async sendMail(email) {
    const user = await service.findByEmail(email);
    if(!user) {
      throw boom.serverUnavailable();
     }
     const transporter = nodemailer.createTransport({
      host: process.env.NODE_MAILER_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.NODE_MAILER_APP_USER, // generated ethereal user
        pass: process.env.NODE_MAILER_APP_PASSWORD, // generated ethereal password
      },
     });
     // send mail with defined transport object
     await transporter.sendMail({
      from: 'admin@mail.com', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Hello user (test)", // Subject line
      text: "Hello user", // plain text body
      html: "<b>Hello user</b>", // html body
     });

  return { message: 'mail sent'};
  }
}


module.exports = AuthService;
