const express = require('express')
const router = express.Router();

const { index, show, create } = require('../controller/propertiesController');
const { reviewsIndex } = require('../controller/reviewsController')

router.get('/', index)
router.get('/:id', show)
router.post('/:owner', create)

router.get('/:id_property/reviews', reviewsIndex)

module.exports = router;