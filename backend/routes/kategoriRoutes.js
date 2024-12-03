const express = require('express');
const { getKategoriPendapatan } = require('../controllers/kategoriPendapatanController');
const { getKategoriPengeluaran } = require('../controllers/kategoriPengeluaranController');
const router = express.Router();

router.get('/kategori-pendapatan', getKategoriPendapatan);
router.get('/kategori-pengeluaran', getKategoriPengeluaran);

module.exports = router;