const User = require('../models/author-model')
const {forgetPasswordMail} = require('../services/sendMails')


exports.getLoginPage = (req, res) => res.render('pages/login.ejs', {title: "Login"})

exports.getRegisterPage = (req, res) => res.render('pages/register.ejs', {title: "Register"})

exports.getAuthorPage =  (req,res) => res.render("pages/author-dashboard.ejs",{title: "Dashboard"})

exports.registerUser = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body
    try {
        // Check if Author exists
        const checkUser = await User.findOne({
            email
        })
        if (checkUser == true) {
            req.flash('error_message', 'User already exists')
            res.redirect('/register')
        }

        await User.create(username, email, password)
        req.flash('success_message', 'User created')
        res.redirect('/login')
    } catch (error) {
        req.flash('error', error)
        res.status(500).json(error)
    }
}

exports.loginUser = (passport) => {
    return passport.authenticate('local', {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: true,
    })
}


exports.googleSignin = (passport) => {
    return passport.authenticate("google", {
        scope: ["email", "profile"]
    });
}

exports.googleSigninCallback = (passport) => {
    return passport.authenticate("google", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: true,
    });
}

// Password reset
exports.getForgotPasswordPage = async (req, res) => res.render("pages/forgotPassword.ejs", {title: "Password Reset"})

exports.postForgotPasswordPage = async (req, res) => {
    const { email } = req.body
    if (!email) {
        req.flash('error_message', 'Please Provide an email Address')
        return res.redirect('/forgot-password')
    }

    // check if email is registered
    let user = await User.findOne({ email: email })
    if (!user) {
        req.flash('error_message', 'Sorry that email is not registered')
        return res.redirect('/forgot-password')
    }

    const token = crypto.randomBytes(25).toString('hex')
    user.passwordResetToken = token
    user.tokenExpiryTime = Date.now() + 900000 //present time plus 15mis
    user = await user.save()

    await forgetPasswordMail(req, token)
    req.flash('success_message', 'Password reset link has been sent to your email.')
    return res.redirect('/login')
}