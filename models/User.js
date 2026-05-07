// Simulation d'une base de données en mémoire
let users = [];
let currentId = 1;

class User {
    constructor(id, name, email, balance = 0, bankId = null) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.balance = balance;
    this.bankId = bankId;   // ← nouveau
    this.createdAt = new Date();
}
    static getAll() {
        return users;
    }

    static getById(id) {
        return users.find(user => user.id === parseInt(id));
    }

    static create(userData) {
    const newUser = new User(currentId++, userData.name, userData.email, userData.balance || 0, userData.bankId || null);
    users.push(newUser);
    return newUser;
}

    static assignBank(userId, bankId) {
    const user = this.getById(userId);
    if (user) { user.bankId = parseInt(bankId); return user; }
    return null;
}

    static updateBalance(id, amount) {
        const user = this.getById(id);
        if (user) {
            user.balance += amount;
            return user;
        }
        return null;
    }

    static update(id, updates) {
    const user = this.getById(id);
    if (!user) return null;
    if (updates.name) user.name = updates.name;
    if (updates.email) user.email = updates.email;
    if (updates.balance !== undefined) user.balance = updates.balance;
    if (updates.bankId !== undefined) user.bankId = updates.bankId;
    return user;
}  

static delete(id) {
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index !== -1) {
        const deletedUser = users.splice(index, 1)[0];
        return deletedUser;
    }
    return null;
}
    static deposit(id, amount) {
        const user = this.getById(id);
        if (user && amount > 0) {
            user.balance += amount;
            return user;
        }
        return null;
    }

    static withdraw(id, amount) {
        const user = this.getById(id);
        if (user && amount > 0 && user.balance >= amount) {
            user.balance -= amount;
            return user;
        }
        return null;
    }
}



module.exports = User;