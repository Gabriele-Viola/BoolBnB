const express = require('express')
const router = express.Router();

const { index, show, create } = require('../controller/propertiesController');

router.get('/', index)
router.get('/:id', show)
router.post('/:owner', create)

module.exports = router;