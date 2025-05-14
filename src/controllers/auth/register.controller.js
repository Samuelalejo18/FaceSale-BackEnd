const user = require("../../models/User.js")
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../../libs/jwt.js");
const fs = require("fs");
const path = require("path");
const { reconocimientoFacial } = require("../reconocimientoFacial/reconocimientoFacial.js");
// const { createAccessToken } = require("../../libs/jwt.js");


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



    // al inicio de register():
    let rawDescriptor = faceDescriptor;
    let descriptorArray;

    // si viene como string JSON, lo parseamos:
    if (typeof rawDescriptor === 'string') {
      try {
        descriptorArray = JSON.parse(rawDescriptor);
      } catch (e) {
        return res.status(400).json({ message: 'Descriptor facial inválido (no JSON)' });
      }
    } else {
      descriptorArray = rawDescriptor;
    }

    // validamos:
    if (!Array.isArray(descriptorArray) || !descriptorArray.every(n => typeof n === 'number')) {
      return res
        .status(400)
        .json({ message: 'Descriptor facial inválido (no array de números)' });
    }

    // --- 2) Comprobar si ya hay un descriptor “demasiado cercano” en la BD ---
    //    Aquí traemos sólo el campo faceDescriptor de cada usuario
    const todos = await user.find({}, 'faceDescriptor');
    for (let u of todos) {
      const stored = u.faceDescriptor; // array guardado
      const distance = reconocimientoFacial(descriptorArray, stored);
      if (distance < 0.6) {
        // si está muy cercano a uno existente, abortamos
        return res
          .status(400)
          .json({ message: 'Registro fallido: rostro ya registrado' });
      }
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
      faceDescriptor: descriptorArray,
      faceImage: imageData ? [imageData] : [],
    });


    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token, { httpOnly: true });
    return res.json({ user: userSaved });

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
