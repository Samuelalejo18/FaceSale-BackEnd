/// Metodos http, para el manejo de usuarios
// el metodo post sea realizo en auth controller

const User = require("../../models/user.js");

//get para obtener los datos del usuario

//Delete: eliminar usuario por iD

const deleteUser = async (req, res) => {
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

module.exports = { deleteUser };
