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
    // const limit = req.body.limit || 2;
    // const page = req.body.page || 1
    // const skip = (page - 1) * limit;
    // await Post.find().skip(skip)
    const posts = await Post.find().populate('author', 'name').sort({ createdAt: -1 })

    res.json({
        success: true,
        posts
    })
})