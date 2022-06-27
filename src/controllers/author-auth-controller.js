const User = require('../models/author-model')
const {
    forgetPasswordMail,
    welcomeToBloggyMail
} = require('../services/sendMails')

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
            res.status(302).json({
                message: "Author Found"
            })
        }

        await User.create(username, email, password)
        res.status(201).json({
            message: "Author Registered Successfully"
        })
        await welcomeToBloggyMail(req, username)
    } catch (error) {
        res.status(500).json({
            message: error
        })
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
exports.postForgotPasswordPage = async (req, res) => {
    const {
        email
    } = req.body
    try {
        if (!email) {
            res.status(406).json({
                message: "Not Vaild Email"
            })
        }

        // check if email is registered
        let user = await User.findOne({
            email: email
        })
        if (!user) {
            res.status(404).json({
                message: "Author Email Not Found"
            })
        }

        const token = crypto.randomBytes(25).toString('hex')
        user.passwordResetToken = token
        user.tokenExpiryTime = Date.now() + 900000 //present time plus 15mis
        user = await user.save()

        await forgetPasswordMail(req, token)
        res.status(200).json({
            message: "Reset Mail Sent"
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}