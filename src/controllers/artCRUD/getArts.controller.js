const Artwork = require("../../models/Artwork"); // Importar el modelo de usuario

const getArts = async (req, res) => {
  try {
    const arts = await Artwork.find();

    res.json(arts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error a traer las obras de arte", error: error.message });
  }
};

const getArtByID = async (req, res) => {
  try {
    const { id } = req.params;
    const artByID = await Artwork.findById(id);

    if (!artByID) {
      return res.status(404).json({ message: "Obra de arte no encontrada" });
    }
    res.json(artByID);
  } catch (error) {
    res.status(500).json({
      message: "Error a traer la obra de arte por ID",
    });
  }
};

module.exports = { getArts, getArtByID };
