const router = require('express').Router()
const authController = require('../controllers/authController')


router.get('/profile', authController.profile)
router.get('/logout', authController.logout)

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgetPassword', authController.forgetPassword)

router.patch('/resetPassword', authController.resetPassword)


module.exports = router