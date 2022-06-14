const User =  require('../models/user-model')


// exports.getLoginPage => 

// exports.getRegisterPage =>

exports.registerUser = aysnc (req,res) => {
    const {username, email, password} = req.body
    try {
        const checkUser = await User.findOne({email})
        if (checkUser == true) {
            req.flash('error_message', 'User already exists')
            res.status(400).json("User already exists")
        } 
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.googleSignin = (passport) => {
    return passport.authenticate("google", { scope: ["email", "profile"] });
}

exports.googleSigninCallback = (passport) => {
    return passport.authenticate("google", {
        // successRedirect: "/api/v2/contact/",
        // failureRedirect: "/api/v2/auth/login",
        failureFlash: true,
    });
}