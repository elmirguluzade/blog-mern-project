const multer = require('multer')

const upload = multer({
    dest: "tmp/",
    limits: { fieldSize: 25 * 1024 * 1024 }
})

module.exports = upload