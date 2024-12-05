const express = require('express');
const { getRekomendasi, addRekomendasi } = require('../controllers/rekomendasiController');
const router = express.Router();

router.get('/:userId', getRekomendasi);
router.get('/', addRekomendasi);

module.exports = router;