const express = require('express');
const { addPendapatan, getPendapatan, deletePendapatan } = require('../controllers/pendapatanController');
const router = express.Router();

router.post('/', addPendapatan);
router.get('/:userId', getPendapatan);
router.delete('/:id', deletePendapatan);

module.exports = router;