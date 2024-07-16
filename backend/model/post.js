const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true })

const Post = mongoose.model('post', postSchema)
module.exports = Post








