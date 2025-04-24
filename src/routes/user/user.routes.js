const { Router } = require("express");

const routerCrudUser = Router();
const { validateSchema } = require("../../middlewares/validator.middleware.js");
const { registerSchema } = require("../../schema/userSchemaZod.js");

const {
  getUsers,
  getUserByID,
} = require("../../controllers/userCRUD/getUsers.Controller.js");

const {
  updateUser,
} = require("../../controllers/userCRUD/updateUser.Controller.js");

const {
  deleteUser,
} = require("../../controllers/userCRUD/deleteUser.controller.js");

routerCrudUser.get("/getUsers", getUsers);

routerCrudUser.get("/getUserByID/:id", getUserByID);

routerCrudUser.put(
  "/updateUser/:id",
  validateSchema(registerSchema),
  updateUser
);

routerCrudUser.delete("/deleteUser/:id", deleteUser);

module.exports = routerCrudUser;
