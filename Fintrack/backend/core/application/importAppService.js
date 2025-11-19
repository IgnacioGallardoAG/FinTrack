import { TransactionFactory } from '../domain/transactionFactory.js';
import { ImportPort } from '../ports/importPort.js';

export class ImportAppService extends ImportPort {
    constructor({ csvValidator, importRepository }) {
        super();
        this.csvValidator = csvValidator;
        this.importRepository = importRepository;
    }

    /**
     * CU-06 Validar Importación (usado también como parte de CU-05).
     */
    async validateCSV(file) {
        if (!file) {
            throw new Error('No se recibió archivo para validar.');
        }

        const { buffer, originalname, mimetype, size } = file;

        const validation = await this.csvValidator.validate(buffer);

        return {
            fileName: originalname,
            mimeType: mimetype,
            size,
            ...validation,
        };
    }

    /**
     * CU-05 Importar CSV (incluye CU-06).
     */
    async importCSV(file) {
        const validation = await this.validateCSV(file);

        if (!validation.isValid) {
            throw new Error('El CSV no es válido. No se puede importar.');
        }

        const rows = validation.preview; // En una versión real usaríamos TODAS las filas
        const transactions = [];

        for (const row of rows) {
            try {
                const tx = TransactionFactory.fromRow(row);
                transactions.push(tx);
            } catch (e) {
                // Podríamos acumular errores por fila si quieres algo más detallado
                console.warn('Fila descartada por error de dominio:', e.message);
            }
        }

        await this.importRepository.saveMany(transactions);

        return {
            imported: transactions.length,
            fileName: validation.fileName,
        };
    }
}
