const { verify } = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const { User } = require("../models");

async function ensureAuthenticated(request, response, next) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: "missing authorization",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, authConfig.jwt.secret);

    const user = await User.findByPk(parseInt(sub));

    if (!user) {
      return response.status(401).json({
        message: "user not authorized",
      });
    }

    request.user = user;

    return next();
  } catch (error) {
    console.log(error);

    return response.status(401).json({
      message: "not autorized",
    });
  }
}

module.exports = ensureAuthenticated;
