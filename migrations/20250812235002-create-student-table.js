'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("students", {
      id: {
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      birth_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable("students");
  },
};
