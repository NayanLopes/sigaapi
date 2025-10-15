"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("users", {
      id: {
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
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
      role: {
        type: Sequelize.DataTypes.ENUM("professor", "diretor"),
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable("users");
  },
};
