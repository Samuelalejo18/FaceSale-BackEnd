const user = require("../models/user.js");

const bcrypt = require("bcrypt");

//Importar token

const { createAccessToken } = require("../controllers/user.controller.js");

const register = async (req, res) => {
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

  try {
    const userFoundEmail = await user.findOne({ email });
    const userFoundUserName = await user.findOne({ userName });
    const userFoundIdentityDocument = await user.findOne({ identityDocument });
    const userFoundNumberPhone = await user.findOne({ numberPhone });

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

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new user({
      name,
      lastName,
      userName,
      identityDocument,
      age,
      email,
      password: passwordHash,
      numberPhone,
      country,
      city,
      address,
      faceDescriptor,
      faceImage,
    });

    const userSaved = await newUser.save();

    //importar token
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      name: userSaved.name,
      lastName: userSaved.lastName,
      userName: userSaved.userName,
      identityDocument: userSaved.identityDocument,
      age: userSaved.age,
      email: userSaved.email,
      numberPhone: userSaved.numberPhone,
      country: userSaved.country,
      city: userSaved.city,
      address: userSaved.address,
      faceDescriptor: userSaved.faceDescriptor,
      faceImage: userSaved.faceImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //buscar si el email/usuario existe
    const userFound = await user.findOne({ email });

    if (!userFound)
      return res.status(400).json({ message: ["❌ The email does not exist"] });

    //comparar la contraseña

    const matchedPassword = await bcrypt.compare(password, userFound.password);
    if (!matchedPassword) {
      return res
        .status(400)
        .json({ message: [" ❌ The password is incorrect"] });
    }

    //Crear y devolver un token
    const token = await createAccessToken({ id: userFound._id });

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
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

const profile = async (req, res) => {};

const virifyToken = async (req, res) => {};

module.exports = { register, login, logout, profile, virifyToken };
