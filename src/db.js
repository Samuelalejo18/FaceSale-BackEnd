// Importa la librería Mongoose para interactuar con MongoDB
const mongoose = require("mongoose");
// Importa las variables de entorno del archivo .env
require("dotenv").config(); /*HABILITAMOS A USAR VARIABLES DE ENTORNO EN NUESTRO DOCUMENTO*/
const { URI_MONGO } = process.env;

// Exporta una función que establece la conexión con MongoDB
module.exports = () => {
  //uri de mongo
  //process.env.URI_MONGO
  mongoose.connect(URI_MONGO).catch((err) => {
    /* Intenta conectar a la base de datos con la URI proporcionada*/
    console.log("Error al conectar a la base de datos", err); 
    // Captura y muestra errores en la conexión
  });
};
