const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.post('/login', controller.signin);
router.post('/signup', controller.signup);
router.post('/oauthgit',controller.oauthgit);

module.exports = router;
