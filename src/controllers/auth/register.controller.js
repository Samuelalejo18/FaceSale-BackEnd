const user = require("../../models/User.js")
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../../libs/jwt.js");
const fs = require("fs");
const path = require("path");



const register = async (req, res, next) => {
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

  } = req.body;

  try {
    
    const passwordHash = await bcrypt.hash(password, 10);



    let imageData = null;
    const file = req.file;
    if (file) {
      const imagePath = path.join(__dirname, "../../../uploads/userFace", file.filename);

      const img = fs.readFileSync(imagePath);
      imageData = {
        name: req.file.originalname,
        image: {
          data: img,
          contentType: req.file.mimetype,
        },
      };
    } else {

      const error = new Error('No file');
      error.httpStatusCode = 400;
      return next(error);

    }




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
      faceImage: imageData ? [imageData] : [],
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);

    res.json({
      userSaved
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



const registerCredentials = async (req, res, next) => {
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

    res.status(200).json({
      message: "Datos del usuario ingresados correctamente, prosigue con el reconocimiento facial"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



module.exports = { register, registerCredentials };
