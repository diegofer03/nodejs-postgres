const UserService = require('../user');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { config } = require('../../config/config');

const userService = new UserService();

class AuthService {
  constructor() {}

  async getUser(email, password) {
    const user = await userService.findByEmail(email);
      if (!user) {
        throw (boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw (boom.unauthorized(), false);
      }
      delete user.dataValues.password;
    return user;
  }

  signToken(user){
    const token = jwt.sign({
      sub: user.id,
      role: user.role
    }, config.secretKey)
    return {
      user,
      token
    }
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.secretKey);
      const user = await userService.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await userService.update(user.id, {recoveryToken: null, password: hash});
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendRecovery(email){
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id
    }
    const token = jwt.sign(payload, config.secretKey, {expiresIn: '30min'})
    const link = `https:://myfrontend.com/recovery?token=${token}`
    await userService.update(user.id, {recoveryToken: token})
    const mail = {
      from: 'otis.gibson91@ethereal.email', // sender address
      to: 'otis.gibson91@ethereal.email', // list of receivers
      subject: "Password recovery", // Subject line
      html: `<b>Reset Link => ${link}</b>`, // html body
    }
    const rta = await this.sendMail(mail);
    return rta
  }

  async sendMail(info) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'otis.gibson91@ethereal.email',
          pass: 'wxppZAq864UncY7Ycz'
      }
  });
  await transporter.sendMail(info);
  return { message: 'mail sent' };
  }
}

module.exports = AuthService;
