const Auction = require("../../models/Auction.js"); // Importar el modelo de subasta

const deleteAuction = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAuction = await Auction.findByIdAndDelete(id);
    if (!deleteAuction) {
      return res.status(404).json({ message: "subasta no encontrada" });
    }

    res.status(200).json({ message: "subasta eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting auction" });
  }
};

module.exports = { deleteAuction };
