const Bank = require('../models/Bank');
const createBank = (req, res) => {
    try {
        const { name, code } = req.body;
        if (!name || !code) return res.status(400).json({ success: false, message: 'Nom et code requis' });
        const bank = Bank.create({ name, code });
        res.status(201).json({ success: true, bank });
    } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
const getAllBanks = (req, res) => res.json({ success: true, banks: Bank.getAll() });
const getBankById = (req, res) => {
    const bank = Bank.getById(req.params.id);
    if (!bank) return res.status(404).json({ success: false, message: 'Banque non trouvée' });
    res.json({ success: true, bank });
};
const updateBank = (req, res) => {
    try {
        const updated = Bank.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ success: false, message: 'Banque non trouvée' });
        res.json({ success: true, bank: updated });
    } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
const deleteBank = (req, res) => {
    const deleted = Bank.delete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Banque non trouvée' });
    res.json({ success: true, message: 'Banque supprimée', bank: deleted });
};
module.exports = { createBank, getAllBanks, getBankById, updateBank, deleteBank };