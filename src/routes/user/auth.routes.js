const { Router } = require("express");

const router = Router();

const authRequired = require("../../middlewares/validateToken.js");
const { validateSchema } = require("../../middlewares/validator.middleware.js");
const {
  registerSchema,
  loginSchema,
} = require("../../schema/userSchemaZod.js");
const { register } = require("../../controllers/auth/register.controller.js");
const {
  login,
  logout,
  profile,
  verifyToken,
} = require("../../controllers/auth/login.controller.js");



// Configure multer for file uploads
const multer = require("multer")
const fs = require("fs");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/userFace";
    fs.mkdirSync(dir, { recursive: true }); // Asegura que el directorio exista
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});


const upload = multer({ storage });


router.post("/register", upload.single("file"), validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/verify", verifyToken);

router.get("/profile", authRequired, profile);

module.exports = router;
