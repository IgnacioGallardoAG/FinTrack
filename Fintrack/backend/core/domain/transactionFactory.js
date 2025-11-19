import { Transaction } from './transaction.js';

export class TransactionFactory {
    /**
     * Crea una Transaction desde una fila del CSV.
     * row es un objeto donde las keys son los nombres de columna.
     */
    static fromRow(row) {
        const date = row.date || row.fecha;
        const amount = parseFloat(row.amount ?? row.monto);
        const category = row.category || row.categoria || 'Sin categoría';
        const description = row.description || row.descripcion || '';

        if (!date || Number.isNaN(amount)) {
            throw new Error('Fila de CSV inválida: falta fecha o monto');
        }

        return new Transaction({ date, amount, category, description });
    }
}
