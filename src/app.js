require('dotenv').config()

// Requiring Packages
const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const xss = require("xss-clean")
const cors = require("cors")
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const path = require('path')
// const rateLimiter = require('express-rate-limiter')
const methodOverride = require('method-override')

// Requiring modules in files
const {connectToDB} = require('./utils/connectDB')
const {initializePassport} = require('./utils/localPassportStrategy')
const {initializeGooglePassport} = require('./utils/googlePassportStrategy')

// ROUTES
const homeRoute = require('./routes/home-routes')
const authorRoute = require('./routes/author-auth-routes')
const articleRoute = require('./routes/article-routes')


// Initialize App
const app = express()

// Templating Engine
app.set('views', path.join(__dirname, '../src/views'))
app.set('view engine', 'ejs')

// Connect Database
connectToDB()


// Middleware
// Note: Always place your middleware before your routes.
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(cors())
app.use(morgan('dev'))
app.use(xss())
app.use(helmet())
// app.use(
//     rateLimiter({
//       windowMs: 15 * 60 * 1000, // 15 minutes
//       max: 1000, // limit each IP to 1000 requests per windowMs
//     })
//   )
app.use(methodOverride('_method'))

// session
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// flash
app.use(flash())
app.use((req, res, next) => {
    res.locals.success_flash = req.flash('success_message')
    res.locals.error_flash = req.flash("error_message");
    res.locals.error = req.flash("error");
    next()
})


//  Save current user in session
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
})



initializePassport(passport)
initializeGooglePassport(passport)


// Use Routes
app.use(homeRoute)
app.use(authorRoute)
app.use(articleRoute)

module.exports =  app
