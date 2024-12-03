const express = require('express');
const { addPendapatan, getPendapatan, deletePendapatan, addPengeluaran, getPengeluaran, deletePengeluaran } = require('../controllers/pengeluaranController');
const router = express.Router();

router.post('/', addPengeluaran);
router.get('/:userId', getPengeluaran);
router.delete('/:id', deletePengeluaran);

module.exports = router;