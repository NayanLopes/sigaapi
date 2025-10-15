"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize)=> {
    return await queryInterface.createTable("class", {
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
      shift: {
        type: Sequelize.DataTypes.ENUM("matutino", "vespertino"),
        allowNull: false,
      },
      age: {
        type: Sequelize.DataTypes.ENUM('3', '4', '5'),
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
    return await queryInterface.dropTable("class");
  },
};
