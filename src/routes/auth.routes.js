//
const { Router } = require("express");
const router = Router();

const {
  register,
  login,
  logout,
  profile,
  virifyToken,
} = require("../controllers/auth.controller");


router.post("/register", register);

module.exports = router;
