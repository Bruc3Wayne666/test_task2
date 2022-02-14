const Router = require('express')
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");
const router = new Router()

router.get('/', postController.getAll)
router.post('/', auth, postController.create)
router.delete('/:id', auth, postController.delete)
router.patch('/:id', auth, postController.edit)

module.exports = router