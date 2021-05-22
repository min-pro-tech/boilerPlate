'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_infos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.STRING,
		unique:true
      },
      password: {
        type: Sequelize.STRING
      },
      nickname: {
        type: Sequelize.STRING,
	  	unique:true
      },
      email: {
        type: Sequelize.STRING,
		unique:true
      },
      name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_infos');
  }
};