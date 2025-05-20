//Crear token
// Importamos la librería jsonwebtoken para manejar tokens JWT
const jwt = require("jsonwebtoken");

const { token } = require("morgan");

// Importamos y configuramos dotenv para gestionar variables de entorno
require("dotenv").config();

// Extraemos la clave secreta desde las variables de entorno
const { SECRET } = process.env;

/**
 * Función para crear un token de acceso (JWT).
 *
 * @param {Object} payload - Datos que se incluirán en el token.
 * @returns {Promise<string>} - Promesa que resuelve con el token generado o rechaza con un error.
 */

function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload, // Datos que se incluirán en el token
      SECRET, // Clave secreta para firmar el token
      {
        expiresIn: 1000, // expira en 5 MINUTOS
      },
      (err, token) => {
        if (err) reject(err); // Si hay un error, rechazamos la promesa
        resolve(token); // Si se genera correctamente, resolvemos la promesa con el token
      }
    );
  });
}

// Exportamos la función para que pueda ser utilizada en otros módulos
module.exports = {
  createAccessToken,
};
