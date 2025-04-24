/**
 * Middleware de validación de esquema para solicitudes HTTP en Express.
 *
 * Esta función recibe un esquema de validación (definido con Zod) y devuelve un middleware
 * que valida el cuerpo de la solicitud (`req.body`). Si los datos no cumplen con el esquema,
 * se devuelve un error con un código de estado 400 y una lista de mensajes de error.
 *
 * @param {Object} schema - Esquema de validación de Zod.
 * @returns {Function} Middleware de Express para validar la solicitud.
 */

const validateSchema = (schema) => {
  try {
    // Intenta validar el cuerpo de la solicitud con el esquema proporcionado.
    schema.parse(req.body);

    // Si la validación es exitosa, pasa al siguiente middleware o controlador.
    next();
  } catch (error) {
    // Si la validación falla, captura el error y maneja la respuesta.

    // Muestra en la consola el primer mensaje de error para facilitar la depuración.
    if (error && Array.isArray(error.errors)) {
      return res.status(400).json({
        errors: error.errors.map((e) => e.message),
      });
    } else {
      console.error("Error en el validador:", error);
      return res.status(500).json({
        error: "Error interno en la validación de datos",
      });
    }
   
    //  console.log(error.errors[0].message);

     // Retorna una respuesta con código 400 (Bad Request) y un array con los mensajes de error.
    //return res.status(400).json(error.errors.map((error) => error.message) );
  }
};


// Exporta la función para que pueda ser utilizada en otros archivos del proyecto.
module.exports = { validateSchema };
