import { TransactionFactory } from '../domain/transactionFactory.js';
import { ImportPort } from '../ports/importPort.js';

export class ImportAppService extends ImportPort {

    constructor({ csvValidator, importRepository, securityPort }) {
        super();
        this.csvValidator = csvValidator;
        this.importRepository = importRepository;
        this.securityPort = securityPort;
    }

    /**
     * CU-06: Validar CSV (no guarda nada)
     */
    async validateCSV(file, userId) {
        if (!file) {
            throw new Error('No se recibió archivo para validar.');
        }

        if (!userId) {
            throw new Error('No se pudo obtener userId desde Keycloak.');
        }

        const { buffer, originalname, mimetype, size } = file;

        const validation = await this.csvValidator.validate(buffer);

        return {
            userId,
            fileName: originalname,
            mimeType: mimetype,
            size,
            ...validation,   // preview, validRows, invalidRows, errorRows, etc.
        };
    }

    /**
     * CU-05: Importar CSV (incluye CU-06)
     */
    async importCSV(file, userId) {
        // 1. Validación completa
        const validation = await this.validateCSV(file, userId);

        if (!validation.isValid) {
            throw new Error('El CSV no es válido. No se puede importar.');
        }

        // 2. Usamos TODAS las filas válidas
        const rows = validation.validRows;
        const transactions = [];

        for (const row of rows) {
            try {
                const tx = TransactionFactory.fromRow(row);
                tx.userId = userId;   // asignación para trazabilidad
                transactions.push(tx);
            } catch (e) {
                console.warn('Fila descartada por error de dominio:', e.message);
            }
        }

        // 3. Guardar en repositorio
        await this.importRepository.saveMany(transactions);

        // 4. Resultado coherente con HU-04 / HU-05
        return {
            userId,
            fileName: validation.fileName,
            imported: transactions.length,
            failed: validation.invalidCount,
            errors: validation.errorRows,
            total: validation.totalRows,
            valid: validation.validCount,
            invalid: validation.invalidCount,
            summary: `Se importaron ${transactions.length} transacciones y ${validation.invalidCount} fueron rechazadas.`,
        };
    }
}
