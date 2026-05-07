// models/Bank.js
let banks = [];
let currentId = 1;

class Bank {
    constructor(id, name, code) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.createdAt = new Date();
    }
    static getAll() { return banks; }
    static getById(id) { return banks.find(b => b.id === parseInt(id)); }
    static getByCode(code) { return banks.find(b => b.code === code); }
    static create({ name, code }) {
        if (this.getByCode(code)) throw new Error('Code bancaire déjà utilisé');
        const newBank = new Bank(currentId++, name, code);
        banks.push(newBank);
        return newBank;
    }
    static update(id, { name, code }) {
        const bank = this.getById(id);
        if (!bank) return null;
        if (name) bank.name = name;
        if (code && code !== bank.code) {
            if (this.getByCode(code)) throw new Error('Code déjà utilisé');
            bank.code = code;
        }
        return bank;
    }
    static delete(id) {
        const index = banks.findIndex(b => b.id === parseInt(id));
        if (index !== -1) return banks.splice(index, 1)[0];
        return null;
    }
}
module.exports = Bank;