export class Transaction {
    constructor({ date, amount, category, description }) {
        this.date = date;
        this.amount = amount;
        this.category = category;
        this.description = description;
    }
}
