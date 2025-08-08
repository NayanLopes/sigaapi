const { hash } = require("bcrypt");
const { User } = require("../models");
const { findOne, findAll } = require("../models/user");

module.exports = {
  async store(request, response) {
    const {
      body: { username, name, contact, birthDate, role, password },
    } = request;

    const userExist = await User.findOne({
      where: {
        username,
      },
    });

    if (userExist) {
      return response.json({
        message: "user already exists",
      });
    }

    const hashedPassword = await hash(password, 8);

    const userCreated = await User.create({
      username,
      name,
      contact,
      birthDate,
      role,
      password: hashedPassword,
    });

    const userData = userCreated.toJSON();
    delete userData.password;

    return response.json({
      userCreated: userData,
    });
  },

  async show(request, response) {
    const { user } = request;

    const userData = user.toJSON();
    delete userData.password;

    return response.json({
      user: userData,
    });
  },

  async delete(request, response) {
    const {
      params: { id },
    } = request;

    if (!id) {
      return response.status(400).json({
        message: "missing data",
      });
    }

    const userToDelete = await User.findByPk(id);

    if (!userToDelete) {
      return response.status(400).json({
        message: "user not found",
      });
    }

    await userToDelete.destroy();

    return response.json({
      message: "user deleted",
    });
  },
  async index(request, response) {
    const users = await User.findAll({
      attributes: [
        "username",
        "name",
        "contact",
        "birthDate",
        "role",
        "createdAt",
        "updatedAt",
      ],
    });

    return response.json({
      users,
    });
  },
  async update(request, response) {
    const {
      params: { id },
      body: { username, name, contact, birthDate, role, password },
    } = request;

    if (!id) {
      return response.status(400).json({
        message: "user not found",
      });
    }

    let newPassword = undefined;

    if (password) {
      newPassword = await hash(password, 8);
    }

    await User.update(
      {
        username,
        name,
        contact,
        birthDate,
        role,
        password: newPassword,
      },
      {
        where: { id }
      }
    );

    return response.json({ message:"user updated" });
  },
};
