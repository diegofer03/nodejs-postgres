// const boom = require('@hapi/boom');

// const getConnection = require('../../lib/postgres');

const { models } = require('./../../lib/sequeliza');

class UserService {
  constructor() {}

  async create(data) {
    const res = await models.User.create(data)
    return res;
  }

  async find() {
    // const client = await getConnection();
    // const rta = await client.query('SELECT * FROM tasks');
    const res = await models.User.findAll({
      include: ['customer']
    });
    return res;
  }

  async findOne(id) {
    const res = await models.User.findByPk(id)
    return res;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const res = await user.update(changes);
    return res;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
