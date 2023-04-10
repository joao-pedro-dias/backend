const { Router, response } = require("express");

const adminsRoutes = Router();

const AdminsController = require("../controllers/adminController");
const adminsController = new AdminsController();

adminsRoutes.post("/", adminsController.create);

module.exports = adminsRoutes;