const express = require('express')
const router = express.Router()
const { index, show, create } = require('../controller/propertiesController');
const { reviewsShow, reviewCreate } = require('../controller/reviewsController')
const { sendMessage } = require('../controller/messagesController')


router.get('/', index)
router.get('/:id', show)
router.post('/:owner', create)
router.post('/message/send', sendMessage)


router.get('/:id_property/reviews', reviewsShow)
router.post('/:id_property/:id_user/add-review', reviewCreate)

module.exports = router;



