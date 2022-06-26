const {Router} = require('express')
const router = Router()
const {isAuth} = require('../middleware/auth-middleware')
const {
    createArticle,
    deleteArticle
} = require('../controllers/article-controller')

// POST
router.post('/new-article', isAuth, createArticle)


// DELETE
router.delete('/delete-article', isAuth, deleteArticle)

module.exports = router