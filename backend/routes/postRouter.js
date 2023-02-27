const router = require('express').Router()
const postController = require('../controllers/postController')
const multer = require('../utils/multer')



router.post('/newPost', multer.single("file"), postController.createPost)


module.exports = router