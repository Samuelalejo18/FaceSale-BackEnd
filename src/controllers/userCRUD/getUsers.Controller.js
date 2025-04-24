const User = require("../../models/user"); // Importar el modelo de usuario

//get para obtener los datos del usuario

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); //Excluir el campo password

    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error a traer los usuarios", error: error.message });
  }
};

//get para obtener los datos del usuario por id
const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const userByID = await User.findById(id).select("-password"); //Excluir el campo password

    if (!userByID) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(userByID);
  } catch (error) {
    res.status(500).json({
      message: "Error a traer  el usuario por ID",
    });
  }
};

module.exports = { getUsers, getUserByID };
