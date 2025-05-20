
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

module.exports = { euclideanDistance }; 