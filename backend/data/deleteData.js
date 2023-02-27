const mongoose = require('mongoose')
const User = require('../model/user')
const Post = require('../model/post')
require('dotenv').config({ path: './config.env' })

const deleteData = async () => {
    if(process.argv[2] === "delete") {
        if(process.argv[3] === "user"){
            await User.deleteMany({})
        }else if(process.argv[3] === "post"){
            await Post.deleteMany({})
        }
        console.log("Data deleted")
        process.exit()
    }
}

deleteData()

const connectionString = process.env.DB_STRING.replace('<password>', process.env.DB_PASSWORD);
mongoose.set('strictQuery', true)
mongoose.connect(connectionString, (err) => {
    if (err) throw err;
    console.log('MongoDB Connected')
})

