require('dotenv').config()
// Requiring Packages
const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const xss = require("xss-clean")
const cors = require("cors")
const passport = require('passport')
const rateLimiter = require('express-rate-limit')

// Requiring modules in files
const {connectToDB} = require('./utils/connectDB')

// Initialize App
const app = express()


// Connect Database
connectToDB()


// Middleware
// Note: Always place your middleware before your routes.
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('dev'))
app.use(xss())
app.use(helmet())
app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 1000 requests per windowMs
    })
  )