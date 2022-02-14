const Router = require('express')
const router = new Router()
const authRouter = require('../router/authRouter')
const postRouter = require('../router/postRouter')


router.get('/', (req, res) => {
    return '<h1>Hello</h1>'
})
router.use('/auth', authRouter)
router.use('/post', postRouter)

module.exports = router