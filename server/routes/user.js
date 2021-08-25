const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.post('/login', controller.signin);
router.post('/signup', controller.signup);
app.post('/oauthgit',controllers.oauthgit);

module.exports = router;
