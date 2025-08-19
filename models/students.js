const { DataTypes, Model } = require("sequelize");

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          unique: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        contact: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        birthDate: {
          type: DataTypes.DATE,
          field: "birth_date",
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
      { sequelize, modelName: "Student", tableName: "students" }
    );
  }
}

module.exports = Student;
