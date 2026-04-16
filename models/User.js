// Simulation d'une base de données en mémoire
let users = [];
let currentId = 1;

class User {
    constructor(id, name, email, balance = 0) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.balance = balance;
        this.createdAt = new Date();
    }

    static getAll() {
        return users;
    }

    static getById(id) {
        return users.find(user => user.id === parseInt(id));
    }

    static create(userData) {
        const newUser = new User(
            currentId++,
            userData.name,
            userData.email,
            userData.balance || 0
        );
        users.push(newUser);
        return newUser;
    }

    static updateBalance(id, amount) {
        const user = this.getById(id);
        if (user) {
            user.balance += amount;
            return user;
        }
        return null;
    }

    static update(id, userData) {
        const user = this.getById(id);
        if (user) {
            if (userData.name) user.name = userData.name;
            if (userData.email) user.email = userData.email;
            if (userData.balance !== undefined) user.balance = userData.balance;
            return user;
        }
        return null;
    }

    static delete(id) {
        const index = users.findIndex(user => user.id === parseInt(id));
        if (index !== -1) {
            const deletedUser = users.splice(index, 1)[0];
            return deletedUser;
        }
        return null;
    }
}

module.exports = User;