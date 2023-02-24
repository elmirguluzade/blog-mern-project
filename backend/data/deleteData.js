const User = require('../model/user')
const mongoose = require('mongoose')
require('dotenv').config({ path: './config.env' })

const deleteData = async () => {
    if(process.argv[2] === "delete") {
        await User.deleteMany({}) 
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

