const router = require('express').Router()
const postController = require('../controllers/postController')
const multer = require('../utils/multer')


router.get('/', postController.posts)
router.get('/:id', postController.onePost)
router.put('/', multer.single("file"), postController.editPost)
router.post('/newPost', multer.single("file"), postController.createPost)


module.exports = router