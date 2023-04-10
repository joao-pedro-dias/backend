const { Router, response } = require("express");

const usersRoutes = Router();

const UsersController = require("../controllers/userController");
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", usersController.update);

module.exports = usersRoutes;