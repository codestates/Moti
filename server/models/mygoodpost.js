'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mygoodPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  mygoodPost.init({
    content: DataTypes.STRING,
    picture: DataTypes.BLOB,
    user_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'mygoodPost',
  });
  return mygoodPost;
};