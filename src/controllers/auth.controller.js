const user = require("../models/user.js");

const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const {
    name,
    lastName,
    userName,
    identityDocument,
    age,
    email,
    password,
    phoneNumber,
    country,
    city,
    address,
    faceDescription,
    faceImage,
  } = req.body;

  try {
    const userFoundEmail = await user.findOne({ email });
    const userFoundUserName = await user.findOne({ userName });
    const userFoundIdentityDocument = await user.findOne({ identityDocument });
    const userFoundPhoneNumber = await user.findOne({ phoneNumber });

    if (userFoundEmail)
      return res.status(400).json({ message: "Email already exists" });

    if (userFoundUserName)
      return res.status(400).json({ message: "Username already exists" });

    if (userFoundIdentityDocument)
      return res
        .status(400)
        .json({ message: "Identity Document already exists" });

    if (userFoundPhoneNumber)
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
      phoneNumber,
      country,
      city,
      address,
      faceDescription,
      faceImage,
    });

    const userSaved = await newUser.save();

    res.json({
      id: userSaved._id,
      name: userSaved.name,
      lastName: userSaved.lastName,
      userName: userSaved.userName,
      identityDocument: userSaved.identityDocument,
      age: userSaved.age,
      email: userSaved.email,
      phoneNumber: userSaved.phoneNumber,
      country: userSaved.country,
      city: userSaved.city,
      address: userSaved.address,
      faceDescription: userSaved.faceDescription,
      faceImage: userSaved.faceImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {};

const logout = (req, res) => {};

const profile = async (req, res) => {};

const virifyToken = async (req, res) => {};

module.exports = { register, login, logout, profile, virifyToken };
