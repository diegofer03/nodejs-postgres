const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORIES_TABLE = 'categories';

const CategoriesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Categories extends Model {
  static associate(models) {
    this.hasMany(models.products, {
      as: 'products',
      foreignKey: 'categoryId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIES_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = { CATEGORIES_TABLE, CategoriesSchema, Categories}
