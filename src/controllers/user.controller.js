/// Metodos http, para el manejo de usuarios
// el metodo post sea realizo en auth controller

const user = require("../models/user.js");

//get para obtener los datos del usuario

const getUser = async (req, res) => {
  try {
    const users = await user.find().select("-password"); // Excluir el campo 'password'
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

//get para obtener los datos del usuario

const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await user.findById(id).select("-password"); // Excluir el campo 'password'
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

// PUT: Actualizar un usuario por ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await user
      .findByIdAndUpdate(id, req.body, { new: true })
      .select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message });
  }
};

// DELETE: Eliminar un usuario por ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await user.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = {
  getUser,
  getUserByID,
  updateUser,
  deleteUser,
};
