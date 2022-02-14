const Router = require('express')
const router = new Router()
const authRouter = require('../router/authRouter')
const postRouter = require('../router/postRouter')
const postController = require('../controllers/postController')

router.use('/auth', authRouter)
router.use('/post', postRouter)

module.exports = router