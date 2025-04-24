/// Metodos http, para el manejo de usuarios
// el metodo post sea realizo en auth controller

const Artwork = require("../../models/Artwork.js"); // Importar el modelo de la arte



const deleteArt = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting user" });
  }
};

module.exports = { deleteArt };
