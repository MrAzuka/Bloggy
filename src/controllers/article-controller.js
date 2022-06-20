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

// exports.getArticles = 
// exports.getOneArtilce =
// exports.updateArticle =
// exports.deleteArticle =