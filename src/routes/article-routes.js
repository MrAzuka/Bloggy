const {Router} = require('express')
const router = Router()
const {isAuth} = require('../middleware/auth-middleware')
const {
    createArticle,
    getArticles,
    getOneArticle,
    deleteArticle
} = require('../controllers/article-controller')

// POST
router.post('/new-article', isAuth, createArticle)

// GET
router.get('/dashboard', isAuth, getArticles)
router.get('/dashboard/:id', isAuth, getOneArticle)

// DELETE
router.delete('/delete-article', isAuth, deleteArticle)

module.exports = router