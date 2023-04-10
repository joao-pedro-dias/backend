const { Router } = require("express");
const usersRouter = require("./users.routes");
const adminsRouter = require("./admins.routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/admins", adminsRouter);

module.exports = routes;