const User = require('../model/user')
const { asyncCatch } = require('../utils/asyncCatch')
const GlobalError = require('../error/GlobalError')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/email')

const signToken = (id) => jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })

exports.signup = asyncCatch(async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    const user = await User.create({ name, email, password, confirmPassword })
    res.json({
        success: true,
        user
    })
})

exports.login = asyncCatch(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new GlobalError("Please enter email and password", 401))
    const user = await User.findOne({ email })
    if (!user) return next(new GlobalError("Email or password is incorrect", 401))
    const isValid = await user?.checkPasswords(password);
    if (!isValid) return next(new GlobalError("Email or password is incorrect", 401))
    const token = signToken(user._id)
    res.cookie('token', token)
    res.json({
        success: true,
        user,
        token
    })
})

exports.logout = (req, res) => {
    res.cookie('token', '').json("Logged out")
}

exports.profile = (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, {}, (err, docs) => {
            if (err) throw err;
            res.json(docs)
        })
    }
}

exports.forgetPassword = asyncCatch(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) return next(new GlobalError("User doesn't exist", 401))
    const resetToken = await user.hashResetPassword()
    await user.save()
    const url = `${req.protocol}://${req.get("host")}/${resetToken}`;
    sendEmail({ name: user.name, to: email, subject: url })
    res.json({
        success: true,
        message: "Email sent"
    })
})

exports.resetPassword = () => {
    
}