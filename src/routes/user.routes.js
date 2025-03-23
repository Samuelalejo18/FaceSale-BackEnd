
const { Router } = require("express");
const routerUser = Router();
const {
  getUser,
  getUserByID,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller.js");

routerUser.get("/getUser", getUser);
routerUser.get("/getUser/:id", getUserByID);
routerUser.put("/updateUser/:id", updateUser);
routerUser.delete("/deleteUser/:id", deleteUser);

module.exports = routerUser;
