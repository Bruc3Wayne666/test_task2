const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        text: {
            type: String,
            max: 400
        },
        img: {
            type: String
        }
    },
    {
        timestamps: true
    })

module.exports = mongoose.model('Post', postSchema)