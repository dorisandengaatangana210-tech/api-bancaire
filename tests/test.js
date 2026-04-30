const assert = require('assert');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

console.log('Début des tests...');

// Création de comptes
const alice = User.create({ name: 'Alice', email: 'alice@example.com', balance: 1000 });
const bob = User.create({ name: 'Bob', email: 'bob@example.com', balance: 500 });
assert.strictEqual(alice.name, 'Alice');
assert.strictEqual(bob.email, 'bob@example.com');
assert.strictEqual(alice.balance, 1000);

// Dépôt
const depositUser = User.deposit(alice.id, 250);
assert.strictEqual(depositUser.balance, 1250);
const depositTransaction = Transaction.create({ toUserId: alice.id, amount: 250, type: 'deposit', description: 'Test de dépôt' });
assert.strictEqual(depositTransaction.toUserId, alice.id);

// Retrait
const withdrawUser = User.withdraw(bob.id, 200);
assert.strictEqual(withdrawUser.balance, 300);
const withdrawTransaction = Transaction.create({ fromUserId: bob.id, amount: 200, type: 'withdraw', description: 'Test de retrait' });
assert.strictEqual(withdrawTransaction.fromUserId, bob.id);

// Virement
assert.strictEqual(alice.balance, 1250);
assert.strictEqual(bob.balance, 300);
User.withdraw(alice.id, 500);
User.deposit(bob.id, 500);
const transferTransaction = Transaction.create({ fromUserId: alice.id, toUserId: bob.id, amount: 500, type: 'transfer', description: 'Test de virement' });
assert.strictEqual(User.getById(alice.id).balance, 750);
assert.strictEqual(User.getById(bob.id).balance, 800);
assert.strictEqual(transferTransaction.amount, 500);

// Historique
const aliceHistory = Transaction.getByUserId(alice.id);
const bobHistory = Transaction.getByUserId(bob.id);
assert.ok(aliceHistory.length >= 2);
assert.ok(bobHistory.length >= 2);

// Mise à jour et suppression
const updatedAlice = User.update(alice.id, { name: 'Alice Modifiée', balance: 900 });
assert.strictEqual(updatedAlice.name, 'Alice Modifiée');
assert.strictEqual(updatedAlice.balance, 900);
const deletedBob = User.delete(bob.id);
assert.strictEqual(deletedBob.id, bob.id);
assert.strictEqual(User.getById(bob.id), undefined);

console.log('✅ Tous les tests ont réussi.');
