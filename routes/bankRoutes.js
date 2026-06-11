// routes/bankRoutes.js
const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');

router.get('/', bankController.getAllBanks);
router.post('/', bankController.createBank);
router.get('/:id', bankController.getBankById);
router.put('/:id', bankController.updateBank);
router.delete('/:id', bankController.deleteBank);

module.exports = router;