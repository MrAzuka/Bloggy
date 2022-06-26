const Article = require('../models/article-model')

exports.createArticle = async (req, res)=> {
    const {title, article, tag, createdBy} = req.body
    try {
        req.user = createdBy
        await Article.create(title, article, tag, createdBy)
    
        res.status(201).json({message: "Article Created"})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

exports.getArticles = async (req,res) => {
    try {
        const data = await Article.find(req.user.id)
        res.status(302).json({message: "Get All Article", articles: data})
    } catch (error) {
        res.status(500).json({message: error})
    }
}
exports.getOneArticle = async (req,res) => {
    try {
        const data = await Article.findById(req.params.id)
        res.status(302).json({message: "Get One Article with id", article: data})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

exports.deleteArticle = async(req,res) => {
    try {
        const getArticle = await Article.findByIdAndDelete(req.params.id)
        if (req.params.id !== getArticle) {
            res.status(404).json({message: "Article Not Found"})
        }
        res.status(200).json({message: "Article Deleted Successfully"})
    } catch (error) {
        res.status(500).json({message: error})
    }
}