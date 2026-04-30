const User = require('../models/User');
const Transaction = require('../models/Transaction');

const addUser = (req, res) => {
    try {
        const { name, email, balance } = req.body;
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Le nom et l\'email sont obligatoires'
            });
        }

        const newUser = User.create({
            name,
            email,
            balance: Number(balance) || 0
        });
        res.status(201).json({
            success: true,
            message: 'Utilisateur ajouté avec succès',
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la création de l\'utilisateur',
            error: error.message
        });
    }
};

const getAllUsers = (req, res) => {
    try {
        const users = User.getAll();
        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des utilisateurs',
            error: error.message
        });
    }
};

const getUserById = (req, res) => {
    try {
        const user = User.getById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé'
            });
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération de l\'utilisateur',
            error: error.message
        });
    }
};

const updateUser = (req, res) => {
    try {
        const updatedUser = User.update(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur introuvable'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Utilisateur modifié avec succès',
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la modification de l\'utilisateur',
            error: error.message
        });
    }
};

const deleteUser = (req, res) => {
    try {
        const deletedUser = User.delete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Utilisateur supprimé avec succès',
            user: deletedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la suppression de l\'utilisateur',
            error: error.message
        });
    }
};

const deposit = (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Le montant du dépôt doit être supérieur à 0'
            });
        }

        const user = User.deposit(req.params.id, Number(amount));
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur introuvable pour le dépôt'
            });
        }

        const transaction = Transaction.create({
            toUserId: req.params.id,
            amount: Number(amount),
            type: 'deposit',
            description: 'Dépôt d\'argent'
        });

        res.status(200).json({
            success: true,
            message: 'Dépôt effectué avec succès',
            user,
            transaction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors du dépôt',
            error: error.message
        });
    }
};

const withdraw = (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Le montant du retrait doit être supérieur à 0'
            });
        }

        const user = User.getById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur introuvable pour le retrait'
            });
        }

        if (user.balance < Number(amount)) {
            return res.status(400).json({
                success: false,
                message: 'Solde insuffisant pour le retrait'
            });
        }

        const updatedUser = User.withdraw(req.params.id, Number(amount));
        const transaction = Transaction.create({
            fromUserId: req.params.id,
            amount: Number(amount),
            type: 'withdraw',
            description: 'Retrait d\'argent'
        });

        res.status(200).json({
            success: true,
            message: 'Retrait effectué avec succès',
            user: updatedUser,
            transaction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors du retrait',
            error: error.message
        });
    }
};

const transfer = (req, res) => {
    try {
        const { fromUserId, toUserId, amount } = req.body;
        if (!fromUserId || !toUserId || !amount || Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Les champs fromUserId, toUserId et amount (positif) sont obligatoires'
            });
        }
        if (fromUserId === toUserId) {
            return res.status(400).json({
                success: false,
                message: 'Vous ne pouvez pas faire un virement vers vous-même'
            });
        }

        const sender = User.getById(fromUserId);
        const receiver = User.getById(toUserId);
        if (!sender || !receiver) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur expéditeur ou destinataire non trouvé'
            });
        }

        if (sender.balance < Number(amount)) {
            return res.status(400).json({
                success: false,
                message: 'Solde insuffisant'
            });
        }

        User.withdraw(fromUserId, Number(amount));
        User.deposit(toUserId, Number(amount));
        const transaction = Transaction.create({
            fromUserId,
            toUserId,
            amount: Number(amount),
            type: 'transfer',
            description: 'Virement interne'
        });

        res.status(200).json({
            success: true,
            message: 'Virement effectué avec succès',
            transaction,
            senderBalance: sender.balance,
            receiverBalance: receiver.balance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors du virement',
            error: error.message
        });
    }
};

const getHistory = (req, res) => {
    try {
        const user = User.getById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé'
            });
        }

        const history = Transaction.getByUserId(req.params.id);
        res.status(200).json({
            success: true,
            userId: Number(req.params.id),
            userName: user.name,
            history
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération de l\'historique',
            error: error.message
        });
    }
};

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    deposit,
    withdraw,
    transfer,
    getHistory
};