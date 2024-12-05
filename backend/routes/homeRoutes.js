const express = require('express');
const { getHomeData } = require('../controllers/homeController');

const router = express.Router();

router.get('/:userId', getHomeData);

module.exports = router;