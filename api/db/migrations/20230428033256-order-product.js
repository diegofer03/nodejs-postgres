'use strict';

const { ORDERPRODUCT_TABLE, OrderProductSchema } = require('../models/order-product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDERPRODUCT_TABLE, OrderProductSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDERPRODUCT_TABLE);
  }
};
