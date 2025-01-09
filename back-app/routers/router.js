const router = require('express').Router()

const { index, show, create, logIn } = require('../controller/propertiesController');

router.get('/properties', index)
router.get('/properties/:id', show)
router.post('/:owner', create)
router.get('/user/logIn', logIn)

module.exports = router;