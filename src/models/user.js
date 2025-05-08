const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  /**
   * Nombre del usuario.
   * @type {String}
   * @required
   */
  name: { type: String, required: true },

  /**
   * Apellido del usuario.
   * @type {String}
   * @required
   */
  lastName: { type: String, required: true },

  /**
   * Nombre de usuario único.
   * @type {String}
   * @required
   * @unique
   */
  userName: { type: String, required: true, unique: true },

  /**
   * Documento de identidad único.
   * @type {Number}
   * @required
   * @unique
   */
  identityDocument: { type: Number, required: true, unique: true },

  /**
   * Edad del usuario.
   * @type {Number}
   * @required
   */
  age: { type: Number, required: true },

  /**
   * Correo electrónico único del usuario.
   * @type {String}
   * @required
   * @unique
   */
  email: { type: String, required: true, unique: true },

  /**
   * Contraseña del usuario (debe ser almacenada de forma segura, por ejemplo, con bcrypt).
   * @type {String}
   * @required
   */
  password: { type: String, required: true },

  /**
   * Número de teléfono único del usuario.
   * @type {Number}
   * @required
   * @unique
   */
  numberPhone: { type: Number, required: true, unique: true },

  /**
   * País de residencia.
   * @type {String}
   * @required
   */
  country: { type: String, required: true },

  /**
   * Ciudad de residencia.
   * @type {String}
   * @required
   */
  city: { type: String, required: true },

  /**
   * Dirección del usuario.
   * @type {String}
   * @required
   */
  address: { type: String, required: true },

  /**
   * Descriptor facial del usuario, un array de números que representa su rostro.
   * Se obtiene con Face-api.js.
   * @type {Array<Number>}
   * @optional
   */
  faceDescriptor: { type: [Number], required: false },

  /**
   * Imagen del rostro del usuario, almacenada en Base64 o como URL.
   * @type {String}
   * @optional
   */
  faceImage: [
    {
      name: {
        type: String,
        required: true
      },
      image: {
        data: Buffer,
        contentType: String
      }
    },
   
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
