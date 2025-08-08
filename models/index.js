const dbConfig = require("../config/config.json");
const Sequelize = require("sequelize");
const User = require("./user");

const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];

const connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const models = [User];

models.forEach((model) => {
  model.init(connection);
});

models.forEach((model) => {
  model.associate && model.associate(connection.models);
});

module.exports = {
  User,
};
