const { asyncCatch } = require('../utils/asyncCatch')
const GlobalError = require('../error/GlobalError')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const Post = require('../model/post')

exports.createPost = asyncCatch(async (req, res, next) => {
    const { originalname, path } = req.file
    const { title, summary, content } = req.body
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1]
    const fileName = path + `.${ext}`
    fs.renameSync(path, fileName)
    const { token } = req.cookies
    jwt.verify(token, process.env.SECRET_KEY, {}, async (err, docs) => {
        if (err) throw err;
        const newPost = await Post.create({ title, summary, content, cover: fileName, author: docs.id })
        res.json({
            success: true,
            post: newPost,
        })
    })
})

exports.posts = asyncCatch(async (req, res) => {
    const posts = await Post.find().populate('author', 'name').sort({ createdAt: -1 })
    res.json({
        success: true,
        posts
    })
})

exports.onePost = asyncCatch(async (req, res, next) => {
    const id = req.params.id;
    const post = await Post.findOne({ _id: id }).populate('author', 'name')
    if (!post) next(new GlobalError("Post doesn't exist", 404))
    res.json({
        success: true,
        post
    })
})

exports.editPost = asyncCatch(async (req, res) => {
    let fileName = null
    if (req.file) {
        const { originalname, path } = req.file
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1]
        fileName = path + `.${ext}`
        fs.renameSync(path, fileName)
    }
    const { title, summary, content, id } = req.body
    const { token } = req.cookies
    jwt.verify(token, process.env.SECRET_KEY, {}, async (err, docs) => {
        if (err) throw err;
        const post = await Post.findById(id)
        const isAuthor = post.author.toString() === docs.id.toString()
        const updatedPost = await post.update({
            title,
            summary,
            content,
            cover: fileName ? fileName : post.cover
        })
        res.json({
            success: true,
            updatedPost
        })
    })
})

