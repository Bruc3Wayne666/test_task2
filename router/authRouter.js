const Router = require('express')
const authController = require("../controllers/authController");
const router = new Router()

router.get('/register', (req, res) => {
    res.render('register')
})
router.get('/login', (req, res) => {
    res.render('login')
})
router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router