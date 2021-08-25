'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RandomAdvice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RandomAdvice.init({
    advice: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RandomAdvice',
  });
  return RandomAdvice;
};