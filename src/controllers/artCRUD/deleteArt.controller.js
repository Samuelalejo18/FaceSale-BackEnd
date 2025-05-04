const Artwork = require("../../models/Artwork.js"); // Importar el modelo de la arte

const deleteArt = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteArtwork = await Artwork.findByIdAndDelete(id);
    if (!deleteArtwork) {
      return res.status(404).json({ message: "obra de arte no encontrada" });
    }

    res.status(200).json({ message: "Obra de arte eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting artWork" });
  }
};

module.exports = { deleteArt };
