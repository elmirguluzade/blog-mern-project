const { asyncCatch } = require('../utils/asyncCatch')
const GlobalError = require('../error/GlobalError')
const fs = require('fs')
const Post = require('../model/post')

exports.createPost = asyncCatch(async (req, res, next) => {
    const { originalname, path } = req.file
    const { title, summary, content } = req.body
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1]
    const fileName = path + `.${ext}`
    fs.renameSync(path, fileName)
    const newPost = await Post.create({ title, summary, content, cover: fileName })
    res.json({
        success: true,
        post: newPost
    })
})