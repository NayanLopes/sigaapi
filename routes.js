const { Router } = require("express");
const userController = require("./controllers/user");
const classController = require("./controllers/class");
const userAuthentication = require("./controllers/userAuthentication");
const ensureAuthenticated = require("./middlewares/ensureAuthenticated");
const ensureHeadteacher = require("./middlewares/ensureHeadteacher");

const routes = Router();

routes.post("/login", userAuthentication.store);

routes.post(
  "/user",
  ensureAuthenticated,
  ensureHeadteacher,
  userController.store
);
routes.get("/user", ensureAuthenticated, userController.show);
routes.delete(
  "/user/:id",
  ensureAuthenticated,
  ensureHeadteacher,
  userController.delete
);
routes.get(
  "/users",
  ensureAuthenticated,
  ensureHeadteacher,
  userController.index
);
routes.patch(
  "/user/:id",
  ensureAuthenticated,
  ensureHeadteacher,
  userController.update
);

routes.post(
  "/class",
  ensureAuthenticated,
  ensureHeadteacher,
  classController.store
);
routes.get("/class/:id", ensureAuthenticated, classController.show);
routes.delete(
  "/class/:id",
  ensureAuthenticated,
  ensureHeadteacher,
  classController.delete
);
routes.get(
  "/classes",
  ensureAuthenticated,
  classController.index
);
routes.patch(
  "/class/:id",
  ensureAuthenticated,
  ensureHeadteacher,
  classController.update
);

module.exports = routes;
