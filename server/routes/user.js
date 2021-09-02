const express = require('express');
const router = express.Router();
const controller = require('../controllers');
const upload = require('../middleware/upload');

router.post('/login', controller.signin);
router.post('/signup', controller.signup);
router.get('/signout', controller.signout);
router.post('/oauthgit',controller.oauthgit);
router.put('/changepassword',controller.changepassword);
router.post('/changeprofile',upload.single('picture'),controller.changeprofile);
router.post('/getemailcode',controller.getemailcode);
router.post('/emailveri',controller.emailveri);
module.exports = router;
