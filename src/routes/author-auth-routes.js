const {Router} = require('express')
const passport = require('passport')
const router = Router()
const {
    loginUser,
    registerUser,
    googleSignin,
    googleSigninCallback,
    postForgotPasswordPage
} = require('../controllers/author-auth-controller')

// POST routes
router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/forgot-password', postForgotPasswordPage)

// GET routes
router.get('/auth/google', googleSignin(passport))
router.get('/auth/google/callback', googleSigninCallback(passport))

module.exports = router