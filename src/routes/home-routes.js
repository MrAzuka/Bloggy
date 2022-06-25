const {Router} = require('express')
const router = Router()
const Article = require('../models/article-model')

router.get('/', async (req,res) => {
    const data = await Article.find()

    res.render('pages/home', {article: data, title: "Bloggy"})
})

module.exports = router