const Artwork = require("../../models/Artwork");
const fs = require("fs");
const path = require("path");

const createArt = async (req, res, next) => {
  const {
    title,
    category,
    artist,
    yearCreated,
    description,
    technique,
    dimensions,
    startingPrice,
    status,
  } = req.body;

  try {
    // Verificar si el título ya existe con otro ID (opcional, si quieres evitar duplicados)
    const artworkFound = await Artwork.findOne({
      title,
    });

    if (artworkFound) {
      return res
        .status(400)
        .json({ message: "La obra ya está registrada con ese título" });
    }

    let imageData = null;
    const file = req.file;
    if (file) {
      const imagePath = path.join(__dirname, "../../../uploads/artWorks", file.filename);

      const img = fs.readFileSync(imagePath);
      imageData = {
        name: req.file.originalname,
        image: {
          data: img,
          contentType: req.file.mimetype,
        },
      };
    } else {

      const error = new Error('No file');
      error.httpStatusCode = 400;
      return next(error);

    }


    const newArt = new Artwork({
      title,
      category,
      artist,
      yearCreated,
      description,
      technique,
      dimensions,
      startingPrice,
      status,
      images: imageData ? [imageData] : [],
    });

    const artSaved = await newArt.save();

    res.json({
      artSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createArt };
