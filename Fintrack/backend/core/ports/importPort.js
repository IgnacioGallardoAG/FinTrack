/**
 * Puerto de entrada para los casos de uso de importación.
 * Define qué operaciones ofrece la aplicación hacia los adaptadores de entrada.
 */
export class ImportPort {
    /**
     * Valida un archivo CSV sin persistir datos.
     * @param {Object} file - Objeto archivo de Multer (buffer, mimetype, originalname, etc.)
     * @returns {Promise<{preview: Array, errors: Array, isValid: boolean}>}
     */
    async validateCSV(file) {
        throw new Error('Not implemented');
    }

    /**
     * Importa un archivo CSV (opcionalmente persiste transacciones).
     * @param {Object} file - Objeto archivo de Multer.
     * @returns {Promise<{imported: number}>}
     */
    async importCSV(file) {
        throw new Error('Not implemented');
    }
}
