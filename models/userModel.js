const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        posts: [{type: mongoose.Types.ObjectId, ref: 'Post.jsx'}]
    },
    {
        timestamps: true
    })

module.exports = mongoose.model('User', userSchema)