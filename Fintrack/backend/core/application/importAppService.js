import { TransactionFactory } from '../domain/transactionFactory.js';
import { ImportPort } from '../ports/importPort.js';

export class ImportAppService extends ImportPort {

    constructor({ csvValidator, importRepository, securityPort }) {
        super();
        this.csvValidator = csvValidator;
        this.importRepository = importRepository;
        this.securityPort = securityPort;
    }

    // =====================================================
    // CU-06 — Validar CSV (no guarda nada)
    // =====================================================
    async validateCSV(file, userId) {
        if (!file) {
            throw new Error("No se recibió archivo para validar.");
        }
        if (!userId) {
            throw new Error("No se pudo obtener userId desde Keycloak.");
        }

        const { buffer, originalname, mimetype, size } = file;

        const validation = await this.csvValidator.validate(buffer);

        return {
            userId,
            fileName: originalname,
            mimeType: mimetype,
            size,
            ...validation,   // preview, validRows, errorRows, etc.
        };
    }

    // =====================================================
    // CU-05 — Importar CSV (importación parcial SIEMPRE)
    // =====================================================
    async importCSV(file, userId) {
        // 1. Validación completa (sin bloquear por errores)
        const validation = await this.validateCSV(file, userId);

        const validRows = validation.validRows ?? [];
        const invalidRows = validation.invalidRows ?? [];
        const errorRows = validation.errorRows ?? [];

        // 2. Transformar SOLO filas válidas
        const transactions = [];

        for (const row of validRows) {
            try {
                const tx = TransactionFactory.fromRow(row);
                tx.userId = userId;
                transactions.push(tx);
            } catch (e) {
                console.warn("Fila descartada por error de dominio:", e.message);
            }
        }

        // 3. Persistencia real (solo válidas)
        await this.importRepository.saveMany(transactions);

        // 4. Respuesta final
        return {
            userId,
            fileName: validation.fileName,
            imported: transactions.length,
            failed: invalidRows.length,
            total: validation.totalRows,
            valid: validRows.length,
            invalid: invalidRows.length,
            errors: errorRows,
            summary: `Se importaron ${transactions.length} transacciones. ` +
                     `${invalidRows.length} filas fueron rechazadas.`
        };
    }
}
