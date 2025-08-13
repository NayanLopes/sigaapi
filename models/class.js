const { DataTypes, Model } = require("sequelize");

class Class extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shift: {
        type: DataTypes.ENUM,
        values: ["matutino", "vespertino"],
        allowNull: false,
      },
      age: {
        type: DataTypes.ENUM,
        values: ["3", "4", "5"],
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {sequelize, modelName: "Class", tableName: "class"}
  );
  }
}

module.exports = Class;