'use strict';

const { CATEGORIES_TABLE, CategoriesSchema } = require('../models/categories.model');
const { PRODUCTS_TABLE, ProductsSchema } = require('../models/products.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CATEGORIES_TABLE, CategoriesSchema);
    await queryInterface.createTable(PRODUCTS_TABLE, ProductsSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CATEGORIES_TABLE);
    await queryInterface.dropTable(PRODUCTS_TABLE);
  }
};
