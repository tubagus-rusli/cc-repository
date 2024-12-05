const express = require('express');
const { getKategoriPendapatan } = require('../controllers/kategoriPendapatanController');
const { getKategoriPengeluaran } = require('../controllers/kategoriPengeluaranController');
const router = express.Router();

router.get('/', getKategoriPendapatan);
router.get('/', getKategoriPengeluaran);

module.exports = router;