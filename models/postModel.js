const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate')

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
postSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Post', postSchema)