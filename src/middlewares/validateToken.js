// Importamos la librería jsonwebtoken para manejar tokens JWT
const jwt = require("jsonwebtoken");

// Importamos y configuramos dotenv para gestionar variables de entorno
require("dotenv").config();

// Extraemos la clave secreta desde las variables de entorno
const { SECRET } = process.env;

/**
 * Middleware para verificar la autenticación de un usuario mediante un token JWT.
 *
 * @param {Object} req - Objeto de solicitud (Request) de Express.
 * @param {Object} res - Objeto de respuesta (Response) de Express.
 * @param {Function} next - Función para pasar al siguiente middleware.
 *
 * @returns {void} - Si el token es válido, almacena la información del usuario en `req.user` y continúa.
 */

const authREquired = async (req, res, next) => {
  try {
    // Extraemos el token de las cookies del cliente
    const { token } = req.cookies;

    // Si no hay token, se deniega el acceso con un estado 401 (No autorizado)
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Verificamos el token usando la clave secreta
    jwt.verify(token, SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }

      // Si el token es válido, almacenamos los datos del usuario en req.user
      req.user = user;

      // Continuamos con el siguiente middleware o controlador
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = authREquired;
