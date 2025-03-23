const express = require("express");
const server = express();

// Configuracion del servidor

//morgan para las peticiones
const morgan = require("morgan");

//cookie-parser para convertir las cookies json
const cookieParser = require("cookie-parser");

//cors para habilitar las peticiones de otros servidores,
// para las peticiones  el body del fronted con el backend, por politicas cors

const cors = require("cors");

//conecta con las rutas

//configuraciones de express
// Habilita CORS (Cross-Origin Resource Sharing) para permitir
// peticiones desde el frontend alojado en http://localhost:8000
server.use(
  cors({
    origin: "http://localhost:8000", // Solo permite solicitudes desde esta URL
    credentials: true, // Permite el envío de cookies en las solicitudes
  })
);
// Configura Morgan para registrar las solicitudes HTTP en la consola en formato 'dev'
server.use(morgan("dev"));
// Habilita el manejo de datos en formato URL codificado en las solicitudes (form-data)
server.use(express.urlencoded({ extended: true }));
// Habilita la interpretación de solicitudes con datos en formato JSON
server.use(express.json());
// Habilita el manejo de cookies en las solicitudes HTTP
server.use(cookieParser());

// Rutas
server.use("/api");

require("./db.js");
module.exports = server;
