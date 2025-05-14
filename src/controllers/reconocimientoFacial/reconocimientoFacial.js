
/**
 * Calcula la distancia euclidiana entre dos vectores numéricos.
 * Si los vectores no son arrays o no tienen la misma longitud, devuelve Infinity.
 */

function euclideanDistance(d1, d2) {

    // 1) Validación previa: ambos deben ser arrays y de igual longitud
    if (!Array.isArray(d1) || !Array.isArray(d2) || d1.length !== d2.length) {
        // Si no se cumple, no podemos comparar → devolvemos un “error” representado por Infinity
        return Infinity;
    }

    // 2) Acumulador de la suma de cuadrados de las diferencias
    let sum = 0;

    // 3) Recorremos cada elemento de los vectores
    for (let i = 0; i < d1.length; i++) {
        // 3.1) Calculamos la diferencia en la dimensión i
        sum += (d1[i] - d2[i]) ** 2;
    }

    // 4) Finalmente devolvemos la raíz cuadrada de ese total
    //    Esto nos da la “distancia en línea recta” en un espacio n-dimensional

    return Math.sqrt(sum);
}


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