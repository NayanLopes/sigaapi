const dbConfig = require("../config/config.json");
const Sequelize = require("sequelize");
const User = require("./user");
const Class = require("./class");
const Student = require("./students");

const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];

const connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const models = [
  User, 
  Class, 
  Student
];

models.forEach((model) => {
  model.init(connection);
});

models.forEach((model) => {
  model.associate && model.associate(connection.models);
});

module.exports = {
  User,
  Class,
  Student,
};
