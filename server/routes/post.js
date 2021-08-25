const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.post('/upload', controller.upload);

module.exports = router;
