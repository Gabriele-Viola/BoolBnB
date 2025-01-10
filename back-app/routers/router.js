const express = require('express')
const router = express.Router()

const { index, show, create } = require('../controller/propertiesController')
const { sendMessage } = require('../controller/messagesController')

router.get('/', index)
router.get('/:id', show)
router.post('/:owner', create)
router.post('/message/send', sendMessage)

module.exports = router
