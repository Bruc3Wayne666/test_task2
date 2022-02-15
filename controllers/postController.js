const Post = require('../models/postModel')
const User = require('../models/userModel')

class PostController {
    async getAll(req, res) {
        try {
            const {_page, _limit} = req.query
            const posts = await Post.paginate({}, {
                populate: 'userId',
                limit: parseInt(_limit, 10),
                page: parseInt(_page, 10),
            })

            res.status(200).json(posts)
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }

    async create(req, res) {
        try {
            const {user} = req

            let newPost = await Post.create({
                userId: user._id,
                ...req.body,
                img: ''
            })

            if (req.files) {
                const {img} = req.files
                await img.mv(`./public/uploads/${newPost._id}.png`, err => {
                    if (err) return res.status(500).json({msg: err.message})
                })

                const imgUrl = newPost._id

                newPost = await Post.findOneAndUpdate({
                    _id: newPost._id
                }, {
                    ...req.body,
                    img: imgUrl
                }, {new: true})
            }

            const newUser = await User.findOneAndUpdate({
                _id: user._id
            }, {
                $push: {posts: newPost._id}
            }, {new: true})

            res.status(200).json(newPost)
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params
            const {user} = req
            const post = await Post.findOneAndDelete({
                _id: id,
                userId: user._id
            })
            if (!post) return res.status(400).json({msg: 'Post does not exist.'})

            const newUser = await User.findOneAndUpdate({
                _id: user._id
            }, {
                $pull: {posts: post._id}
            }, {new: true})

            res.status(200).json({msg: 'Post deleted.'})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }

    async edit(req, res) {
        try {
            const {id} = req.params
            const {user} = req

            if (req.files) {
                const {img} = req.files
                await img.mv(`./public/uploads/${id}.png`, err => {
                    if (err) return res.status(500).json({msg: err.message})
                })
            }

            const post = await Post.findOneAndUpdate({
                _id: id,
                userId: user._id
            }, {
                ...req.body,
                img: id
            })

            res.status(200).json({msg: 'Post updated!'})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }
}

module.exports = new PostController()