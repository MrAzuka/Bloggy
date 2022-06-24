const Article = require('../models/article-model')

exports.createArticle = async (req, res)=> {
    const {title, article, tag, createdBy} = req.body
    try {
        req.user = createdBy
        await Article.create(title, article, tag, createdBy)
        req.flash('success_message', 'Article created successfully')
        res.redirect('/dashboard')
    } catch (error) {
        req.flash('error', error)
        res.status(500).json(error)
    }
}

exports.getArticles = async (req,res) => {
    try {
        const data = await Article.find(req.user.id)
        res.render('pages/author-articles.ejs', {authorArticles: data, title: "Articles"})
    } catch (error) {
        req.flash('error', error)
        res.status(500).json(error)
    }
}
exports.getOneArticle = async (req,res) => {
    try {
        const data = await Article.findById(req.params.id)
        res.render('pages/author-articles.ejs', {authorArticles: data, title: "Articles"})
    } catch (error) {
        req.flash('error', error)
        res.status(500).json(error)
    }
}

exports.deleteArticle = async(req,res) => {
    try {
        const getArticle = await Article.findByIdAndDelete(req.params.id)
        if (req.params.id !== getArticle) {
            req.flash('error_message', "Article doesn't exist")
            res.redirect('/dashboard')
        }
        req.flash('success_message', "Delete successful")
        res.redirect('/dashboard')
    } catch (error) {
        req.flash('error', error)
        res.status(500).json(error)
    }
}