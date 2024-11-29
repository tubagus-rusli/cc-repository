const express = require('express');
const { getSaldo, updateSaldo } = require('../controllers/saldoController');
const router = express.Router();

router.get('/', getSaldo);
router.post('/', updateSaldo);

module.exports = router;