export class ImportRepository {
    /**
     * Guarda múltiples transacciones.
     * En el MVP solo simula la persistencia.
     * @param {Array} transactions
     */
    async saveMany(transactions) {
        // Aquí iría Sequelize / SQLite en una versión más completa.
        console.log(`Simulando guardado de ${transactions.length} transacciones.`);
        return;
    }
}
