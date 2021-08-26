const express = require('express');
const router = express.Router();
const controller = require('../controllers');
const upload = require('../middleware/upload');

router.post('/upload/:userId', upload.single('picture'), controller.upload);
router.delete('/delete', controller.delete);
router.post('/allposts', controller.allposts);

module.exports = router;
