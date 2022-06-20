exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('error_message', 'You must be logged In.')
    return res.redirect('/login')
}

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect('/');
    }
    next();
}
