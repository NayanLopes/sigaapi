function ensureHeadteacher(request, response, next) {
  const { user } = request;

  if (user.role != "diretor") {
    return response.status(401).json({
      message: "user not authorized",
    });
  }

  return next();
}

module.exports = ensureHeadteacher;
