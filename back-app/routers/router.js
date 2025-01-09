const router = require('express').Router()

const { index, show, create, logIn, registration } = require('../controller/propertiesController');

router.get('/properties', index)
router.get('/properties/:id', show)
router.post('/:owner', create)
router.get('/user/logIn', logIn)
router.post('/user/registration', registration)


module.exports = router;