const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
require('dotenv').config({ path: './config.env' })

const errorHandler = require('./error/errorHandler')
const GlobalError = require('./error/GlobalError')

const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')

app.use(express.json())
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(morgan("dev"))
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))

// !Routes
app.use('/user', userRouter)
app.use('/post', postRouter)

app.use((req, res, next) => next(new GlobalError(`${req.originalUrl} doesn't exist`, 404)))

// !Error Handling
app.use(errorHandler)

const connectionString = process.env.DB_STRING.replace('<password>', process.env.DB_PASSWORD);
mongoose.set('strictQuery', true)
mongoose.connect(connectionString, (err) => {
    if (err) throw err;
    const PORT = process.env.PORT;
    console.log('MongoDB Connected')
    app.listen(PORT, () => console.log(`Server is listening at ${PORT}`))
})




