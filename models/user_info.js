'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_info.init({
    userID: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
	 timestamps: false 
  }, {
    sequelize,
    modelName: 'user_info',
  });
  return user_info;
};