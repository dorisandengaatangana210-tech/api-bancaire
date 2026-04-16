const User = require('../models/User');

// 1. Ajouter un utilisateur
const addUser = (req, res) => {
    try {
        const { name, email, balance } = req.body;
        
        // Validation des données
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Le nom et l'email sont obligatoires"
            });
        }
        
        // Créer l'utilisateur
        const newUser = User.create({ name, email, balance });
        
        res.status(201).json({
            success: true,
            message: "Utilisateur ajouté avec succès",
            user: newUser
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de l'ajout",
            error: error.message
        });
    }
};

// 2. Obtenir la liste des utilisateurs
const getAllUsers = (req, res) => {
    try {
        const users = User.getAll();
        
        res.status(200).json({
            success: true,
            count: users.length,
            users: users
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération",
            error: error.message
        });
    }
};

// Bonus : Obtenir un utilisateur par son ID
const getUserById = (req, res) => {
    try {
        const { id } = req.params;
        const user = User.getById(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé"
            });
        }
        
        res.status(200).json({
            success: true,
            user: user
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la recherche",
            error: error.message
        });
    }
};

// 3. Modifier un utilisateur
const updateUser = (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, balance } = req.body;
        
        // Validation des données
        if (!name && !email && balance === undefined) {
            return res.status(400).json({
                success: false,
                message: "Au moins un champ (name, email, balance) doit être fourni"
            });
        }
        
        const updatedUser = User.update(id, { name, email, balance });
        
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Utilisateur modifié avec succès",
            user: updatedUser
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la modification",
            error: error.message
        });
    }
};

// 4. Supprimer un utilisateur
const deleteUser = (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = User.delete(id);
        
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Utilisateur supprimé avec succès",
            user: deletedUser
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la suppression",
            error: error.message
        });
    }
};

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};