const Post = require('../models/postModel')
const User = require('../models/userModel')

class PostController {
    async getAll(req, res) {
        try {
            const posts = await Post.find({})
                .populate('userId', '-password')
                .select('-password')
            res.status(200).json(posts)
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }

    async create(req, res) {
        try {
            const {user} = req
            const {img} = req.files

            // console.log(img)

            const newPost = await Post.create({
                userId: user._id,
                ...req.body,
                img: ''
            })

            await img.mv(`./uploads/${newPost._id}.png`, err => {
                if (err) return res.status(500).json({msg: err.message})
            })

            const imgUrl = newPost._id

            const newPostDone = await Post.findOneAndUpdate({
                _id: newPost._id
            }, {
                ...req.body,
                img: imgUrl
            }, {new: true})

            // console.log(newPostDone)

            const newUser = await User.findOneAndUpdate({
                _id: user._id
            }, {
                $push: {posts: newPostDone._id}
            }, {new: true})

            res.status(200).json(newPostDone)
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
            const {img} = req.files
            const {user} = req

            const post = await Post.findOneAndUpdate({
                _id: id,
                userId: user._id
            }, {
                ...req.body
            })

            await img.mv(`./uploads/${post._id}.png`, err => {
                if (err) return res.status(500).json({msg: err.message})
            })

            res.status(200).json({msg: 'Post updated!'})
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }
}

module.exports = new PostController()