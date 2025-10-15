const { User } = require("../models");
const { sign } = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const { compare } = require("bcrypt");

module.exports = {
  async store(request, response) {
    const { username, password } = request.body;

    if (!username || !password) {
      return response.json({
        message: "missing credentials",
      });
    }

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return response.json({
        message: "credentials wrong",
      });
    }

    if (!(await compare(password, user.password))) {
      return response.json({
        message: "credentials wrong",
      });
    }

    const token = sign(
      {
        id: user.id,
      },
      authConfig.jwt.secret,
      {
        subject: user.id.toString(),
        expiresIn: authConfig.jwt.expiresIn,
      }
    );

    const userData = user.toJSON();
    delete userData.password;

    return response.status(201).json({
      user: userData,
      token,
    });
  },
};
