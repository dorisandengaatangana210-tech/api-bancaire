const express = require('express');
const router = express.Router();
const bankCtrl = require('../controllers/bankController');
router.post('/', bankCtrl.createBank);
router.get('/', bankCtrl.getAllBanks);
router.get('/:id', bankCtrl.getBankById);
router.put('/:id', bankCtrl.updateBank);
router.delete('/:id', bankCtrl.deleteBank);
module.exports = router;