require("dotenv").config(); /*HABILITAMOS A USAR VARIABLES DE ENTORNO EN NUESTRO DOCUMENTO*/
const { PORT } = process.env;
const server = require("./src/app.js");
const connectDB = require("./src/db.js");

/* -----------base de datos------------------------- */
connectDB();

// Inicia el servidor en el puerto especificado en las variables de entorno
// y muestra un mensaje en la consola si el servidor se levanta correctamente
server.listen(PORT, () => {
  console.log(
    `Servidor levantado correctamente en el puerto in http://localhost:${PORT}`
  );
});
