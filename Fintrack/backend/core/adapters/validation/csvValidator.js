import csvParser from 'csv-parser';
import { Readable } from 'stream';

export class CsvValidator {
    /**
     * Valida y parsea un buffer CSV.
     * Devuelve preview, filas válidas/ inválidas, y errores detallados.
     * @param {Buffer} buffer
     */
    async validate(buffer) {
        if (!buffer || buffer.length === 0) {
            return {
                preview: [],
                validRows: [],
                invalidRows: [],
                errorRows: [],
                errors: ['El archivo está vacío'],
                totalRows: 0,
                validCount: 0,
                invalidCount: 0,
                isValid: false,
            };
        }

        const rows = await this.#parseBuffer(buffer);
        const generalErrors = [];

        if (rows.length === 0) {
            generalErrors.push('El CSV no contiene filas de datos.');
        }

        // --- Validación de estructura (encabezados) ---
        const expectedHeaders = ['fecha', 'tipo', 'monto', 'categoria', 'descripcion'];
        const header = rows[0] ? Object.keys(rows[0]).map(k => k.toLowerCase()) : [];

        const missingHeaders = expectedHeaders.filter(h => !header.includes(h));

        if (missingHeaders.length > 0) {
            generalErrors.push(
                `El CSV debe contener las columnas: ${expectedHeaders.join(', ')}. ` +
                `Faltan: ${missingHeaders.join(', ')}.`
            );
        }

        const validRows = [];
        const invalidRows = [];
        const errorRows = [];

        // --- Validación fila a fila (HU-05) ---
        rows.forEach((rawRow, index) => {
            // index + 2 porque la fila 1 es el header
            const rowNumber = index + 2;

            const { normalizedRow, rowErrors } = this.#validateRow(rawRow);

            if (rowErrors.length > 0) {
                invalidRows.push(rawRow);
                errorRows.push({ row: rowNumber, errors: rowErrors });
            } else {
                validRows.push(normalizedRow);
            }
        });

        const totalRows = rows.length;
        const validCount = validRows.length;
        const invalidCount = invalidRows.length;

        const isValid = generalErrors.length === 0 && invalidCount === 0;

        return {
            // Para compatibilidad con lo que ya tenías:
            preview: validRows.slice(0, 10),

            // Nuevos campos útiles para HU-04 / HU-05:
            validRows,
            invalidRows,
            errorRows,
            errors: generalErrors,    // errores generales de estructura / archivo
            totalRows,
            validCount,
            invalidCount,
            isValid,
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

    /**
     * Valida una fila individual según las reglas de negocio.
     * Devuelve la fila normalizada + lista de errores.
     */
    #validateRow(rawRow) {
        const errors = [];

        // Tomamos los campos y limpiamos espacios
        const fechaStr = (rawRow.fecha || '').trim();
        const tipoStr = (rawRow.tipo || '').trim().toLowerCase();
        const montoStr = (rawRow.monto || '').toString().trim();
        const categoriaStr = (rawRow.categoria || '').trim();
        const descripcionStr = (rawRow.descripcion || '').trim();

        // --- Fecha: obligatoria, formato dd-mm-yyyy o dd/mm/yyyy ---
        if (!fechaStr) {
            errors.push('La fecha es obligatoria.');
        } else {
            const match = fechaStr.match(/^(\d{2})[\/-](\d{2})[\/-](\d{4})$/);
            if (!match) {
                errors.push('La fecha debe tener formato día-mes-año (dd-mm-yyyy o dd/mm/yyyy).');
            } else {
                const [, dd, mm, yyyy] = match;
                const day = Number(dd);
                const month = Number(mm);
                const year = Number(yyyy);
                const dateObj = new Date(year, month - 1, day);

                if (
                    Number.isNaN(dateObj.getTime()) ||
                    dateObj.getDate() !== day ||
                    dateObj.getMonth() !== month - 1 ||
                    dateObj.getFullYear() !== year
                ) {
                    errors.push('La fecha no es válida.');
                }
            }
        }

        // --- Tipo: ingreso / gasto ---
        if (!tipoStr) {
            errors.push('El tipo es obligatorio (ingreso/gasto).');
        } else if (tipoStr !== 'ingreso' && tipoStr !== 'gasto') {
            errors.push('El tipo debe ser "ingreso" o "gasto".');
        }

        // --- Monto: número, > 0 y <= 1.000.000.000 ---
        const amount = parseFloat(montoStr.replace(',', '.'));
        if (Number.isNaN(amount)) {
            errors.push('El monto debe ser un número válido.');
        } else {
            if (amount <= 0) {
                errors.push('El monto debe ser mayor que 0.');
            }
            if (amount > 1000000000) {
                errors.push('El monto no puede exceder 1.000.000.000.');
            }
        }

        // --- Categoría: obligatoria, máx 100 caracteres ---
        if (!categoriaStr) {
            errors.push('La categoría es obligatoria.');
        } else if (categoriaStr.length > 100) {
            errors.push('La categoría no puede superar 100 caracteres.');
        }

        // --- Descripción: opcional, máx 200 caracteres ---
        if (descripcionStr && descripcionStr.length > 200) {
            errors.push('La descripción no puede superar 200 caracteres.');
        }

        // Fila normalizada (coherente con TransactionFactory)
        const normalizedRow = {
            fecha: fechaStr,
            tipo: tipoStr,                // ya en minúsculas
            monto: Number.isNaN(amount) ? null : amount,
            categoria: categoriaStr,
            descripcion: descripcionStr,
        };

        return { normalizedRow, rowErrors: errors };
    }
}
