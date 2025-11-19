import csvParser from 'csv-parser';
import { Readable } from 'stream';

export class CsvValidator {
    /**
     * Valida y parsea un buffer CSV.
     * Devuelve un pequeño preview + lista de errores.
     * @param {Buffer} buffer
     */
    async validate(buffer) {
        if (!buffer || buffer.length === 0) {
            return {
                preview: [],
                errors: ['El archivo está vacío'],
                isValid: false,
            };
        }

        const rows = await this.#parseBuffer(buffer);
        const errors = [];

        if (rows.length === 0) {
            errors.push('El CSV no contiene filas de datos.');
        }

        // Validación mínima: que existan ciertas columnas
        const requiredColumns = ['date', 'fecha', 'amount', 'monto'];
        const header = rows[0] ? Object.keys(rows[0]).map(k => k.toLowerCase()) : [];

        const hasDate = header.includes('date') || header.includes('fecha');
        const hasAmount = header.includes('amount') || header.includes('monto');

        if (!hasDate || !hasAmount) {
            errors.push('El CSV debe contener columnas de fecha y monto (date/fecha, amount/monto).');
        }

        return {
            preview: rows.slice(0, 10), // primeras 10 filas
            errors,
            isValid: errors.length === 0,
        };
    }

    #parseBuffer(buffer) {
        return new Promise((resolve, reject) => {
            const rows = [];
            const stream = Readable.from(buffer);

            stream
                .pipe(csvParser())
                .on('data', (data) => rows.push(data))
                .on('end', () => resolve(rows))
                .on('error', (err) => reject(err));
        });
    }
}
