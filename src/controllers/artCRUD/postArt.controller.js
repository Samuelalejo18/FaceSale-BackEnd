const Artwork= require("../../models/Artwork"); 

const createArt = async (req, res) => {
  const {
    title,
    category,
    artist,
    yearCreated,
    description,
    technique,
    dimensions,
    images,
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

    const newArt = new Artwork ({
      title,
      category,
      artist,
      yearCreated,
      description,
      technique,
      dimensions,
      images,
      startingPrice,
      status,
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
