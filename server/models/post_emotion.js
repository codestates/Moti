'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_emotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Post_emotion.init({
    Post_Id: DataTypes.INTEGER,
    emotion_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post_emotion',
  });
  return Post_emotion;
};