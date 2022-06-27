const {
    Router
} = require('express')
const router = Router()
const Article = require('../models/article-model')

router.get('/', async (req, res) => {
    const data = await Article.find()

    return res.status(200).json({
        message: "Welcome to Bloggy",
        articles: data
    })
})

module.exports = router