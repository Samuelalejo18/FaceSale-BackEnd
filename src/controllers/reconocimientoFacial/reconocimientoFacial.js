
const { euclideanDistance } = require("./euclideanDistance")


/**
 * Valida y compara el descriptor facial entrante con el almacenado.
 * Devuelve la distancia euclidiana o emite un error HTTP si hay problema.
 */

const reconocimientoFacial = (descriptorFacialBody, storedDescriptor) => {
    // 1) Tomamos el descriptor que llegó en el body
    let inputDescriptor = descriptorFacialBody;
    // 2) Si viene como JSON-string, lo parseamos a array
    if (typeof inputDescriptor === 'string') {
        try {
            inputDescriptor = JSON.parse(inputDescriptor);
        } catch {
            // Si falla el parseo, devolvemos un 400 de descriptor inválido
            return res.status(400).json({ message: 'Descriptor facial inválido (login)' });
        }
    }

    // 3) Validación estricta: debe ser un array no vacío de números
    if (!Array.isArray(inputDescriptor) || inputDescriptor.length === 0 || !inputDescriptor.every(n => typeof n === 'number')) {
        return res.status(400).json({ message: 'No se recibió descriptor facial válido' });
    }
    // 4) Calculamos la distancia euclidiana entre el descriptor almacenado y el ingresado
    const distance = euclideanDistance(storedDescriptor, inputDescriptor);
    console.log('stored:', storedDescriptor.length, 'input:', inputDescriptor.length, 'dist:', distance);

    // 6) Devolvemos la distancia para que el controlador decida si autoriza el acceso
    return distance;
}


module.exports = {
    reconocimientoFacial
}