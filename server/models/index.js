'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {}; 

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const { Post, emotion, user, Post_emotion} = sequelize.models;

user.hasMany(Post, {
  foreignKey: 'user_Id'
}); //예네 2개를 주석처리하니깐 unknown column error가 안 난다. 근데 어떻게 처리해야 할지 모르겠다. 대신 업로드가 안됨
Post.belongsTo(user, {
  foreignKey: 'user_Id'
}); 

Post.hasMany(Post_emotion, {
  foreignKey: 'Post_Id'
});
Post_emotion.belongsTo(Post, {
  foreignKey: 'Post_Id'
});
Post.belongsToMany(emotion, { through: 'Post_emotion', foreignKey: 'Post_Id'});

emotion.hasMany(Post_emotion, {
  foreignKey: 'emotion_Id'
});
Post_emotion.belongsTo(emotion, {
  foreignKey: 'emotion_Id'
});
emotion.belongsToMany(Post, {through: 'Post_emotion', foreignKey: 'emotion_Id'});

module.exports = db;
