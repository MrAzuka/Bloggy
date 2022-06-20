const {Router} = require('express')
const passport = require('passport')
const router = Router()
const {
    getLoginPage,
    getRegisterPage,
    loginUser,
    registerUser,
    googleSignin,
    googleSigninCallback,
    getForgotPasswordPage,
    postForgotPasswordPage
} = require('../controllers/author-auth-controller')

// POST routes
router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/forgot-password', postForgotPasswordPage)

// GET routes
router.get('/auth/google', googleSignin(passport))
router.get('/auth/google/callback', googleSigninCallback(passport))
router.get('/login', getLoginPage)
router.get('/register', getRegisterPage)
router.get('/forgot-password', getForgotPasswordPage)
module.exports = router