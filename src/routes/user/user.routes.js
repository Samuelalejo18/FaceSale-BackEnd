const { Router } = require("express");

const routerCrudUser = Router();
const { validateSchema } = require("../../middlewares/validator.middleware.js");
const { updateSchema } = require("../../schema/userSchemaZod.js");
const authRequired = require("../../middlewares/validateToken.js")
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
  authRequired,
  validateSchema(updateSchema),
  updateUser
);

routerCrudUser.delete("/deleteUser/:id", authRequired, deleteUser);

module.exports = routerCrudUser;
