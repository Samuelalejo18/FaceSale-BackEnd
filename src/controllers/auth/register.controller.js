const user = require("../../models/User.js")
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../../libs/jwt.js");
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
      return res.status(400).json({ message: " ❌ El correo electrónico ya existe" });

    if (userFoundUserName)
      return res.status(400).json({ message: " ❌ El nombre de usuario ya existe" });

    if (userFoundIdentityDocument)
      return res
        .status(400)
        .json({ message: " ❌ El documento de identidad ya existe" });

    if (userFoundNumberPhone)
      return res.status(400).json({ message: " ❌ El número de teléfono ya existe" });


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


module.exports = { register };
