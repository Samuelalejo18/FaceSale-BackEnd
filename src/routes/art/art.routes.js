const { Router } = require("express");

const routerCrudArt = Router();


const {
  getArts,
  getArtByID,
} = require("../../controllers/artCRUD/getArts.controller.js");

const {
  createArt,
} = require("../../controllers/artCRUD/postArt.controller.js");
const {
  updateArtwork,
} = require("../../controllers/artCRUD/updateArt.controller.js");
const {
  deleteArt,
} = require("../../controllers/artCRUD/deleteArt.controller.js");

// Obtener todas las obras de arte
routerCrudArt.get("/getArts", getArts);

// Obtener una sola obra de arte por ID
routerCrudArt.get("/getArt/:id", getArtByID);

// Crear una nueva obra de arte

// Configure multer for file uploads
const multer = require("multer")
const fs = require("fs");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/artWorks";
    fs.mkdirSync(dir, { recursive: true }); // Asegura que el directorio exista
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});



const upload = multer({ storage });

routerCrudArt.post("/createArt", upload.single("file"), createArt);

// Actualizar una obra de arte por ID

routerCrudArt.put("/updateArt/:id", updateArtwork);

// Eliminar una obra de arte por ID
routerCrudArt.delete("/deleteArt/:id", deleteArt);

module.exports = routerCrudArt;
