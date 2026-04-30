// Simulation d'une base de données de transactions en mémoire
let transactions = [];
let currentId = 1;

class Transaction {
    static create({ fromUserId = null, toUserId = null, amount, type, description = '' }) {
        const transaction = {
            id: currentId++,
            fromUserId: fromUserId !== null ? parseInt(fromUserId) : null,
            toUserId: toUserId !== null ? parseInt(toUserId) : null,
            amount,
            type,
            description,
            date: new Date()
        };
        transactions.push(transaction);
        return transaction;
    }

    static getAll() {
        return transactions;
    }

    static getByUserId(userId) {
        const id = parseInt(userId);
        return transactions.filter(
            transaction => transaction.fromUserId === id || transaction.toUserId === id
        );
    }
}

module.exports = Transaction;
