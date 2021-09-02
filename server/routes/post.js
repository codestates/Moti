const express = require('express');
const router = express.Router();
const controller = require('../controllers');
const upload = require('../middleware/upload');

router.post('/upload', upload.single('picture'), controller.upload);
router.delete('/delete', controller.delete);
router.get('/allposts', controller.allposts);
router.get('/posts/:emotion', controller.partofposts);

module.exports = router;
