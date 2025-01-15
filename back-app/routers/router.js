const router = require('express').Router()

const { index, show, create, likeUpdate } = require('../controller/propertiesController')
const { logIn, registration } = require('../controller/usersController')
const { reviewsShow, reviewCreate } = require('../controller/reviewsController')
const { sendMessage } = require('../controller/messagesController')

router.get('/properties', index)
router.get('/properties/:id', show)


//const { upload } = PostController; // Import Multer configurated
//router.post('/', upload.single('file'), PostController.store);   //x upload also file with Multer

router.post('/properties/:owner', create)
router.put('/like/:id', likeUpdate)

router.get('/user/logIn', logIn)
router.post('/user/registration', registration)

router.post('/message/send', sendMessage)

router.get('/:id_property/reviews', reviewsShow)
router.post('/:id_property/:name/add-review', reviewCreate)

module.exports = router




