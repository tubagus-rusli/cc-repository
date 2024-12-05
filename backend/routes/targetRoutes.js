const express = require('express');
const { getTarget, updateTarget } = require('../controllers/targetController');
const router = express.Router();

router.get('/:userId', getTarget);
router.post('/', updateTarget);

module.exports = router;