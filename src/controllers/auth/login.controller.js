const User = require("../../models/User.js");
const bcrypt = require("bcrypt");
const {reconocimientoFacial}=require("../reconocimientoFacial/reconocimientoFacial.js");
//Importar token

const { createAccessToken } = require("../../libs/jwt.js");
//Importar la libreria de jsonwebtoken

const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET } = process.env;

const login = async (req, res) => {
  try {
    const { email, password, descriptorFacial } = req.body;

    //buscar si el correo existe

    const userFoundEmail = await User.findOne({ email });
    if (!userFoundEmail) {
      return res.status(400).json({ message: "El correo no existe ❌" });
    }

    //Comparar la contraseña

    const matchedPassword = await bcrypt.compare(
      password,
      userFoundEmail.password
    );

    if (!matchedPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta ❌" });
    }

    const storedDescriptor = userFoundEmail.faceDescriptor; // ya guardado correctamente
    // si quieres, validar storedDescriptor de forma análoga..

    const distance = reconocimientoFacial(descriptorFacial, storedDescriptor);

    if (distance < 0.6) {

      //Crear token y dovolver un token
      const token = await createAccessToken({ id: userFoundEmail._id });
      res.cookie("token", token);

      res.json({
        id: userFoundEmail._id,
        name: userFoundEmail.name,
        lastName: userFoundEmail.lastName,
        userName: userFoundEmail.userName,
        identityDocument: userFoundEmail.identityDocument,
        age: userFoundEmail.age,
        email: userFoundEmail.email,
        numberPhone: userFoundEmail.numberPhone,
        country: userFoundEmail.country,
        city: userFoundEmail.city,
        address: userFoundEmail.address,
        faceDescriptor: userFoundEmail.faceDescriptor,
        faceImage: userFoundEmail.faceImage,
      });
    } else {
      return res.status(401).json({ message: 'Reconocimiento facial fallido, no coincide el rostro' });
    }


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



const loginCredentials = async (req, res) => {
  try {
    const { email, password } = req.body;

    //buscar si el correo existe

    const userFoundEmail = await User.findOne({ email });
    if (!userFoundEmail) {
      return res.status(400).json({ message: "El correo no existe ❌" });
    }

    //Comparar la contraseña

    const matchedPassword = await bcrypt.compare(
      password,
      userFoundEmail.password
    );

    if (!matchedPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta ❌" });
    }


    res.status(200).json({
      message: "Credenciales correctas,  prosigue con el reconocimiento facial",
      id: userFoundEmail._id,
      name: userFoundEmail.name,
      lastName: userFoundEmail.lastName,
      userName: userFoundEmail.userName,
      identityDocument: userFoundEmail.identityDocument,
      age: userFoundEmail.age,
      email: userFoundEmail.email,
      numberPhone: userFoundEmail.numberPhone,
      country: userFoundEmail.country,
      city: userFoundEmail.city,
      address: userFoundEmail.address,
      faceDescriptor: userFoundEmail.faceDescriptor,
      faceImage: userFoundEmail.faceImage,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



//Deslogearse o cerrar el token

const logout = (req, res) => {
  // Limpia la cookie en el servidor
  res.clearCookie('token', {
    path: '/',
    // si marcaste httpOnly/token secure, aquí debes repetir esas opciones
  });

  // Envía un JSON con tu mensaje
  return res
    .status(200)
    .json({ message: 'Sesión cerrada correctamente' });
};



//mirar perfil

const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  res.json({
    id: userFound._id,
    name: userFound.name,
    lastName: userFound.lastName,
    userName: userFound.userName,
    identityDocument: userFound.identityDocument,
    age: userFound.age,
    email: userFound.email,
    numberPhone: userFound.numberPhone,
    country: userFound.country,
    city: userFound.city,
    address: userFound.address,
    faceDescriptor: userFound.faceDescriptor,
    faceImage: userFound.faceImage,
  });
};

const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(400).json({ message: "No autirizado" });
  jwt.verify(token, SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autirizado" });
    const userFound = await User.findById(user.id);

    if (!userFound) return res.status(401).json({ message: "No autirizado" });

    res.json({
      id: userFound._id,
      name: userFound.name,
      lastName: userFound.lastName,
      userName: userFound.userName,
      identityDocument: userFound.identityDocument,
      age: userFound.age,
      email: userFound.email,
      numberPhone: userFound.numberPhone,
      country: userFound.country,
      city: userFound.city,
      address: userFound.address,
      faceDescriptor: userFound.faceDescriptor,
      faceImage: userFound.faceImage,
    });
  });
};

module.exports = { login, loginCredentials, logout, profile, verifyToken };
