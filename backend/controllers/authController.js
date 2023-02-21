const User = require('../model/user')
const { asyncCatch } = require('../utils/asyncCatch')
const GlobalError = require('../error/GlobalError')
const jwt = require('jsonwebtoken')

const signToken = (id) => jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })


exports.signup = asyncCatch(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) next(new GlobalError("Please enter all information"))
    const user = await User.create({ name, email, password, confirmPassword })
    res.json({
        success: user
    })
})

exports.login = asyncCatch(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new GlobalError("Please enter email and password"), 401)
    const user = await User.findOne({ email })
    if (!user) return next(new GlobalError("Email or password is incorrect", 401))
    const isValid = await user?.checkPasswords(password);
    if (!isValid) return next(new GlobalError("Email or password is incorrect", 401))
    const token = signToken(user._id)
    res.json({
        success: true,
        user,
        token
    })
})