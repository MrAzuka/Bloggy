const {
    Router
} = require('express')
const router = Router()
const {
    requireSignIn
} = require('../middleware/auth-middleware')
const {
    createArticle,
    deleteArticle
} = require('../controllers/article-controller')

// POST
router.post('/new-article', requireSignIn, createArticle)


// DELETE
router.delete('/delete-article', requireSignIn, deleteArticle)

module.exports = router