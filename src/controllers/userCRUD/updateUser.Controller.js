/// Metodos http, para el manejo de usuarios
// el metodo post sea realizo en auth controller

const User = require("../../models/User")
const bcrypt = require("bcrypt");
//get para obtener los datos del us
// PUT: Actualizar un usuario por ID

const updateUser = async (req, res) => {
  try {
    const {
      name,
      lastName,
      userName,
      identityDocument,
      age,
      email,
      password,
      numberPhone,
      country,
      city,
      address,
      faceDescriptor,
      faceImage,
    } = req.body;

    // Verificar si el correo ya está registrado por otro usuario
    const userFoundEmail = await User.findOne({
      email,
      _id: { $ne: req.params.id },
    });
    const userFoundUserName = await User.findOne({
      userName,
      _id: { $ne: req.params.id },
    });
    const userFoundIdentityDocument = await User.findOne({
      identityDocument,
      _id: { $ne: req.params.id },
    });
    const userFoundNumberPhone = await User.findOne({
      numberPhone,
      _id: { $ne: req.params.id },
    });

    if (userFoundEmail)
      return res.status(400).json({ message: "Email already exists" });

    if (userFoundUserName)
      return res.status(400).json({ message: "Username already exists" });

    if (userFoundIdentityDocument)
      return res
        .status(400)
        .json({ message: "Identity Document already exists" });

    if (userFoundNumberPhone)
      return res.status(400).json({ message: "Phone Number already exists" });

    if (userFoundEmail) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptar la contraseña solo si se envió una nueva
    let updatedPassword = undefined;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    // Construir objeto con los campos actualizables
    const updateData = {
      name,
      lastName,
      userName,
      identityDocument,
      age,
      email,
      password,
      numberPhone,
      country,
      city,
      address,
      faceDescriptor,
      faceImage,
    };

    if (updatedPassword) {
      updateData.password = updatedPassword;
    }

    // Actualizar usuario
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      message: "Usuario actualizado con éxito",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error actualizando el usuario", error: error.message });
  }
};

module.exports = { updateUser };
