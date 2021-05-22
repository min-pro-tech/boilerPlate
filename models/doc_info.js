'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doc_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  doc_info.init({
    docID: {
		type: DataTypes.INTEGER,
		primaryKey : true
	},
    title: DataTypes.STRING,
    userID: DataTypes.STRING,
    description: DataTypes.STRING,
    datetime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'doc_info',
  });
  return doc_info;
};